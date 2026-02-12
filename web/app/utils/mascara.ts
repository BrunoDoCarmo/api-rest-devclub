export const formatCPFCNPJ = (value: string, type: string) => {
    const cleanValue = value.replace(/\D/g, ""); // Garante que só existam números
    
    if (type === "LEGAL") {
        // Máscara CNPJ: 00.000.000/0000-00
        return cleanValue
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 18);
    } else {
        // Máscara CPF: 000.000.000-00
        return cleanValue
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .slice(0, 14);
    } 
}

export const formatCEP = (value: string) => {
    const cleanValue = value.replace(/\D/g, ""); // Garante que só existam números
    
    // Máscara CEP: 00000-000
    return cleanValue
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
};

export const formatPhone = (value: string) => {
    const cleanValue = value.replace(/\D/g, ""); // Garante que só existam números
    if (cleanValue.length <= 10) {
        // Máscara Telefone Fixo: (00) 0000-0000
        return cleanValue
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 14);
    } else {
        // Máscara Celular: (00) 00000-0000
        return cleanValue
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 15);
    }
}