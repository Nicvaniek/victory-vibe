import { useState } from 'react'
import { Storage } from './index'

export const useLocalStorage = <K extends keyof Storage>(
    key: K,
    initialValue: Storage[K] | null
): [
    value: Storage[K] | null,
    updateValue: (value: Storage[K]) => void,
    removeValue: () => void,
] => {
    const storedValue = localStorage.getItem(key.toString())

    const initial = storedValue ? JSON.parse(storedValue) : initialValue

    const [value, setValue] = useState<Storage[K] | null>(initial)

    const updateValue = (newValue: Storage[K]) => {
        setValue(newValue)
        localStorage.setItem(key.toString(), JSON.stringify(newValue))
    }

    const removeValue = () => {
        setValue(null)
        localStorage.removeItem(key)
    }

    return [value, updateValue, removeValue]
}
