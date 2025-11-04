import { useState } from "react"
import { ChevronsUpDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils" // helper from shadcn

export function EmailSearch({ users, selectedUser, setSelectedUser }) {
  const [open, setOpen] = useState(false)

  const selectedUserObj = users.find((u) => u._id === selectedUser)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="col-span-3 justify-between"
        >
          {selectedUserObj ? selectedUserObj.email : "Search email..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search E-mail..." />
          <CommandEmpty>No Email found.</CommandEmpty>
          <CommandGroup>
            {users.map((user) => (
              <CommandItem
                key={user._id}
                value={user.email}
                onSelect={() => {
                  setSelectedUser(user._id)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedUser === user._id ? "opacity-100" : "opacity-0"
                  )}
                />
                {user.email}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
