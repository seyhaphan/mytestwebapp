'use client'
import { TelegramProvider } from './TelegramProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <TelegramProvider>
            {children}
        </TelegramProvider>
    )
}