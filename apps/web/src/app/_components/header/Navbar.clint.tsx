'use client';
import React, { useState } from 'react';
import { HoveredLink, Menu } from './Navbar-Menu.client';

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <Menu setActive={setActive}>
      <HoveredLink href="/">Landing</HoveredLink>
      <HoveredLink href="/protected">Protected Page</HoveredLink>
    </Menu>
  );
}
