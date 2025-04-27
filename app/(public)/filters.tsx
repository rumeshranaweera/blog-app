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
    <Select
      onValueChange={(value) => handleSearch(value)}
      defaultValue={searchParams.get("query") || ""}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Tag" />
      </SelectTrigger>
      <SelectContent>
        {[{ name: "ALL", id: "All" }, ...tags].map((tag) => (
          <SelectItem key={tag.id} value={tag.name}>
            {tag.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default Filters;
