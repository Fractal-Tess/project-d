import { Avatar, AvatarFallback, AvatarImage } from '@ui/components/ui/avatar';
import type { Session } from '$/server/auth';

type Props = {
  session: Session;
};
export async function AvatarIcon({ session }: Props) {
  return (
    <Avatar className="!ml-32">
      <AvatarImage src={session?.user?.image ?? undefined} />
      <AvatarFallback className="text-sm">
        {session?.user?.name
          ?.split(' ')
          .map(token => token.charAt(0).toUpperCase()) ?? 'NULL'}
      </AvatarFallback>
    </Avatar>
  );
}
