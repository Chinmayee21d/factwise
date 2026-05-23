import { redirect } from "next/navigation";

// This route has moved to /inquiry-to-quote — 308 permanent redirect
export default function SolutionsRedirect() {
  redirect("/inquiry-to-quote");
}
