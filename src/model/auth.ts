import { useSession } from "next-auth/react";

export type TSessionStatus = ReturnType<typeof useSession>['status'];
