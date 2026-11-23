import { redirect } from "next/navigation";

export default function ChristmasPage() {
  redirect("/coloring-pages?collection=christmas");
}
