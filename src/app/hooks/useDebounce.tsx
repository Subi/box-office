import { useEffect, useState } from "react";

export default function useDebounce(value: string , delay:number): string | undefined {
    const [debouncedValue , setDebouncedValue] = useState<string>()

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        } , delay)
        return () => {
            clearTimeout(handler)
        }
    } , [value , delay]
    )
    return debouncedValue
}