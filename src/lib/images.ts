import cafe from "@/assets/cafe.jpg";
import hamburguesa from "@/assets/hamburguesa.jpg";
import torta from "@/assets/torta.jpg";
import bebidas from "@/assets/bebidas.jpg";

// real = photos of the actual café; others are provisional art-directed images
// to be replaced with real product photography.
export const IMG = {
  terraza: { src: "/terraza.jpg", alt: "Terraza de La Mona con mesas, sillas y luces colgantes", real: true },
  exterior: { src: "/terraza.jpg", alt: "Exterior de La Mona con terraza y logo", real: true },
  cafe: { src: cafe, alt: "Capuchino con arte latte sobre mesa de madera (imagen referencial)", real: false },
  hamburguesa: { src: hamburguesa, alt: "Hamburguesa sobre tabla de madera (imagen referencial)", real: false },
  torta: { src: torta, alt: "Porción de torta de chocolate (imagen referencial)", real: false },
  bebidas: { src: bebidas, alt: "Frappé de coco y jugos naturales (imagen referencial)", real: false },
};
