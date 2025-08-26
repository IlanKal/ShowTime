export async function simulateNetwork(signal?: AbortSignal, ms=200) {
    if(!signal){
        return new Promise((r) => setTimeout(r, ms));
    }

    return new Promise<void>((resolve, reject) => {
        const id = setTimeout(() => resolve(), ms);
        const onAbort = () => {
            clearTimeout(id);
            reject(new DOMException("Aborted", "AbortError"));
        };

        if (signal.aborted) {
            onAbort();
            return;
          }
        signal.addEventListener("abort", onAbort, {once: true});
    });

}