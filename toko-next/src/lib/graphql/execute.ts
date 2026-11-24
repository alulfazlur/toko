import "server-only";
import { TypedDocumentString } from "@/gql/graphql";
import { env } from "@/lib/env";

type CacheMode = "catalog" | "live";

const fetchOptionsByCache: Record<CacheMode, RequestInit> = {
    catalog: { next: { revalidate: 300 } }, // catalog cached 5 min
    live: { cache: "no-store" },  // cart always fresh
}

type GraphqlResponse<T> = {
    data?: T;
    errors?: { message: string }[];
}

export const executeGraphql = async<TResult, TVariables>(
    document: TypedDocumentString<TResult, TVariables>,
    options: { variables: TVariables; cache: CacheMode },
): Promise<TResult> => {
    const res = await fetch(env.SALEOR_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: document.toString(),
            variables: options.variables
        }),
        ...fetchOptionsByCache[options.cache]
    })

    if (!res.ok) {
        throw new Error(`GraphQL HTTP ${res.status} ${res.statusText}`);
    }

    const json = (await res.json()) as GraphqlResponse<TResult>;

    if (json.errors?.length) {
        throw new Error(`GraphQL error: ${json.errors.map(e => e.message).join(", ")}`);
    }

    if (!json.data) {
        throw new Error(`GraphQL error: no data returned`);
    }

    return json.data;
}
