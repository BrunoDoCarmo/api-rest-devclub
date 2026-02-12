export interface MeResponse {
  user: {
    id: string;
    name: string;
    role: "ADMIN" | "USER";
  };
  tenant: {
    id: string;
    name: string;
  };
  responsible: {
    name: string;
    email: string;
  };

  id: string;
  name: string;
  email: string;
  role: string;
  tenantId: string;
};
