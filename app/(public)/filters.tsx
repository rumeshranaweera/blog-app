"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

function Filters({ tags }: { tags: { id: string; name: string }[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      className="w-full p-4 mt-2"
      defaultValue="ALL"
      onChange={(e) => handleSearch(e.target.value)}
    >
      {[{ name: "ALL", id: "All" }, ...tags].map((tag) => (
        <option key={tag.id} value={tag.name} className="text-black">
          {tag.name}
        </option>
      ))}
    </select>
  );
}

export default Filters;
