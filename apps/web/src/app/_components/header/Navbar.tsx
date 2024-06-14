'use client';
import React, { useState } from 'react';
import { HoveredLink, Menu, MenuItem } from '@ui/components/navbar-menu';

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <Menu setActive={setActive}>
      <HoveredLink href="/">Landing</HoveredLink>

      <MenuItem setActive={setActive} active={active} item="Auth">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/auth/login">Login</HoveredLink>
          <HoveredLink href="/auth/register">Register</HoveredLink>
          <HoveredLink href="/profile">Profile control</HoveredLink>
        </div>
      </MenuItem>
    </Menu>
  );
}
