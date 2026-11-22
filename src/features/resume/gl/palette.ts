import { Color } from "three";

export { palette } from "@/features/resume/experience/palette";

/** Raw sRGB triplets for ShaderMaterials that write straight to the framebuffer. */
export function rawColor(hex: string): Color {
  return new Color().setRGB(
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  );
}
