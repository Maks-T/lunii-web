import { PropsWithChildren } from 'react';
import {Header} from "@/widgets/header/ui/Header";
import {Footer} from "@/widgets/footer/ui/Footer";

export default function MainLayout({ children }: PropsWithChildren) {
    return (
        <div className="relative flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
