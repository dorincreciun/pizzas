import {useLoaderStore} from "../model/useLoaderStore";

export const Loader = () => {
    const {isLoading} = useLoaderStore()

    if (!isLoading) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div role="status" aria-live="polite" className="inline-flex items-center gap-3">
                    <span className="relative inline-flex h-5 w-5">
                        <span
                            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                        <span
                            className="relative inline-flex h-5 w-5 animate-spin items-center justify-center rounded-full border-2 border-current border-t-transparent"></span>
                    </span>
                <span className="text-sm font-medium">Se încarcă…</span>
            </div>
        </div>
    )
}