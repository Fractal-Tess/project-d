'use client';
import React, { useState } from 'react';
import { HoveredLink, Menu } from '@ui/components/navbar-menu';

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <Menu setActive={setActive}>
      <HoveredLink href="/">Landing</HoveredLink>
      <HoveredLink href="/foo">Foo</HoveredLink>
    </Menu>
  );
}
