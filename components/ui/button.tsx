// Importa todo React, necesario para usar JSX, hooks y forwardRef
import * as React from "react";

// Importa Slot de Radix, permite que un componente renderice otro componente hijo,
// manteniendo el estilo y la lógica del componente padre
import { Slot } from "@radix-ui/react-slot";

// Importa cva (Class Variance Authority) y el tipo VariantProps
// CVA permite definir variantes de estilos de Tailwind de forma tipada y reusable
import { cva, type VariantProps } from "class-variance-authority";

// Importa la función cn que combina clases condicionalmente y evita duplicados
import { cn } from "@/lib/utils/utils";

// -----------------------------------------------------------------------------
// Definición de variantes y estilos base del botón usando cva
// -----------------------------------------------------------------------------
const buttonVariants = cva(
  // Estilos base que siempre se aplican al botón
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    // Definición de variantes de estilo
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      // Definición de tamaños y espaciado
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        full: "h-10 w-full rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    // Define qué variante y tamaño usar por defecto
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// -----------------------------------------------------------------------------
// Interfaz de tipos para el botón
// -----------------------------------------------------------------------------
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { // agrega props de CVA (variant y size)
  asChild?: boolean; // permite renderizar otro componente en lugar del <button> real
}

// -----------------------------------------------------------------------------
// Componente Button usando forwardRef para pasar refs hacia el DOM
// -----------------------------------------------------------------------------
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {

    // Si se usa asChild=true, el botón renderiza un Slot para pasar estilos al hijo
    // Si no, se renderiza un <button> normal
    const Comp = asChild ? Slot : "button";

    return (
      // 1. Combina los estilos base y las variantes con cualquier clase adicional pasada por className
      // 2. Pasa la referencia al DOM
      // 3. Pasa todas las demás props (onClick, type, disabled, etc.)
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

// Nombre que se mostrará en React DevTools
Button.displayName = "Button";

// Exporta el componente Button y las variantes para poder reutilizarlas
export { Button, buttonVariants };
