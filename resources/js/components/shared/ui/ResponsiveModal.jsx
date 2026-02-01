import * as React from "react"
import {useMediaQuery} from "@/hooks/use-media-query.js"
import {cn} from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

export default function ResponsiveModal({
                                          isOpen,
                                          onClose,
                                          children,
                                          title = "",
                                          description
                                        }) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  // DESKTOP
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent
          className="sm:max-w-[425px] bg-white p-0 overflow-hidden border-none shadow-2xl rounded-2xl"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description || title}
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  // MOBILE
  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      // Убираем snapPoints, чтобы шторка вела себя естественно
    >
      <DrawerContent
        className={cn(
          "bg-white fixed bottom-0 left-0 right-0 outline-none",
          "rounded-t-[20px]",
          "flex flex-col",
          "max-h-[90dvh]",
          "mt-0"
        )}
      >
        {/* Заголовок нужен для a11y, но скрыт */}
        <DrawerHeader className="sr-only">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>
            {description || title}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto w-full px-3 pb-8 pt-4">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
