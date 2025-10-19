'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { UIKitContent } from '@/components/ui-kit/ui-kit-content';
import { useState } from 'react';
import type { UserRole } from '@/lib/types';

export default function UIKitPage() {
  const [currentRole] = useState<UserRole>('system_admin');
  const [currentPath] = useState('/ui-kit');

  return (
    <AppLayout
      currentRole={currentRole}
      currentPath={currentPath}
      onNavigate={() => {}}
      onRoleChange={() => {}}
      hideRoleSwitcher
    >
      <UIKitContent />
    </AppLayout>
  );
}
