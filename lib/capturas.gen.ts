// Gerado por scripts/capturar.mjs. Nao edite a mao.
// Para recapturar: npm run capturas
export const capturas = [
  {
    "id": "comercial-funil",
    "legenda": "O funil comercial com as oportunidades por estágio",
    "rota": "/comercial/pipeline"
  },
  {
    "id": "comercial-marcas",
    "legenda": "O cadastro de marcas atendidas pela agência",
    "rota": "/marcas"
  },
  {
    "id": "comercial-nova-oportunidade",
    "legenda": "O formulário de nova oportunidade",
    "rota": "/comercial/oportunidades"
  },
  {
    "id": "comercial-oportunidades",
    "legenda": "A lista de oportunidades",
    "rota": "/comercial/oportunidades"
  },
  {
    "id": "comercial-propostas",
    "legenda": "A lista de propostas com status e vínculos",
    "rota": "/comercial/propostas"
  },
  {
    "id": "financeiro-contas",
    "legenda": "As contas financeiras da agência",
    "rota": "/financeiro/contas"
  },
  {
    "id": "financeiro-monitor",
    "legenda": "O monitor financeiro, com indicadores e central de alertas",
    "rota": "/financeiro/monitor"
  },
  {
    "id": "financeiro-novo-lancamento",
    "legenda": "O formulário de novo lançamento financeiro",
    "rota": "/financeiro/receber"
  },
  {
    "id": "financeiro-pagar",
    "legenda": "Custos e pagamentos vinculados à campanha",
    "rota": "/financeiro/pagar"
  },
  {
    "id": "financeiro-periodos",
    "legenda": "Os períodos financeiros e seu status de fechamento",
    "rota": "/financeiro/periodos"
  },
  {
    "id": "financeiro-receber",
    "legenda": "Contas a receber, com indicadores e filtros",
    "rota": "/financeiro/receber"
  },
  {
    "id": "financeiro-repasses",
    "legenda": "Os repasses para influenciadores",
    "rota": "/financeiro/repasses-creators"
  },
  {
    "id": "integracoes-contas",
    "legenda": "As contas conectadas de serviços externos",
    "rota": "/integracoes/contas"
  },
  {
    "id": "painel",
    "legenda": "O Painel, primeira tela depois do login",
    "rota": "/"
  },
  {
    "id": "producao-aprovacoes",
    "legenda": "Entregas aguardando aprovação da marca",
    "rota": "/operacao/aprovacoes"
  },
  {
    "id": "producao-calendario",
    "legenda": "O calendário de entregas",
    "rota": "/operacao/calendario"
  },
  {
    "id": "producao-campanhas",
    "legenda": "A lista de campanhas com budget, período e status",
    "rota": "/campanhas"
  },
  {
    "id": "producao-influenciadores",
    "legenda": "A base de influenciadores da agência",
    "rota": "/creators"
  },
  {
    "id": "producao-licencas",
    "legenda": "As licenças de uso do conteúdo e seus vencimentos",
    "rota": "/operacao/licencas"
  },
  {
    "id": "relatorios",
    "legenda": "O catálogo de relatórios por área",
    "rota": "/relatorios"
  }
] as const;

export type CapturaId = (typeof capturas)[number]['id'];

export const larguraCaptura = 1920;
export const alturaCaptura = 1080;
