"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import {
  Box,
  Flex,
  Container,
  DropdownMenu,
  Avatar,
  Text,
} from "@radix-ui/themes";

function NavBar() {
  const currentPath = usePathname();
  const { data: session, status } = useSession();

  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="5">
            <Link href="/" className="text-xl">
              🐞
            </Link>{" "}
            <ul className="flex space-x-5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classNames({
                      "text-zinc-900 font-medium": currentPath === link.href,
                      "text-zinc-500 hover:text-zinc-800 transition-colors":
                        currentPath !== link.href,
                    })}
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>

          <Box>
            <AuthStatus session={session} status={status} />
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}

export default NavBar;

interface AuthStatusProps {
  session: import("next-auth").Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

const AuthStatus = ({ session, status }: AuthStatusProps) => {
  if (status === "loading") return <Box>Loading...</Box>;

  if (status === "unauthenticated") {
    return (
      <Link
        className="text-zinc-500 hover:text-zinc-800"
        href="/api/auth/signin"
      >
        Log In
      </Link>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={session!.user!.image!}
          fallback="?"
          size="2"
          radius="full"
          className="cursor-pointer"
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size="2">{session!.user!.email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href="/api/auth/signout">Log Out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
