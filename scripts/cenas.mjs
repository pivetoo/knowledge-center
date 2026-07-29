// Catalogo de cenas capturadas do Mainstay.
//
// Cada cena vira um arquivo em public/capturas/<id>.png e uma entrada em lib/capturas.gen.ts.
// Nos artigos, use <Captura id="..." />. O build quebra se o id nao existir no manifesto, entao
// remover uma cena daqui avisa em vez de deixar botao apontando para imagem inexistente.
//
// Campos:
//   id       identificador usado no MDX e no nome do arquivo
//   rota     caminho no Mainstay
//   legenda  texto do botao e do rodape da imagem
//   seletor  (opcional) espera esse elemento antes de capturar
//   preparar (opcional) acoes antes da captura (abrir aba, abrir modal)

export const cenas = [
  {
    id: 'painel',
    rota: '/',
    legenda: 'O Painel, primeira tela depois do login',
  },
  {
    id: 'comercial-funil',
    rota: '/comercial/pipeline',
    legenda: 'O funil comercial com as oportunidades por estágio',
  },
  {
    id: 'comercial-oportunidades',
    rota: '/comercial/oportunidades',
    legenda: 'A lista de oportunidades',
  },
  {
    id: 'comercial-nova-oportunidade',
    rota: '/comercial/oportunidades',
    legenda: 'O formulário de nova oportunidade',
    async preparar(pagina) {
      await pagina.getByRole('button', { name: /Nova oportunidade|Cadastrar oportunidade/i }).first().click();
      await pagina.waitForTimeout(1200);
    },
  },
  {
    id: 'comercial-propostas',
    rota: '/comercial/propostas',
    legenda: 'A lista de propostas com status e vínculos',
  },
  {
    id: 'comercial-marcas',
    rota: '/marcas',
    legenda: 'O cadastro de marcas atendidas pela agência',
  },
  {
    id: 'producao-campanhas',
    rota: '/campanhas',
    legenda: 'A lista de campanhas com budget, período e status',
  },
  {
    id: 'producao-influenciadores',
    rota: '/creators',
    legenda: 'A base de influenciadores da agência',
  },
  {
    id: 'producao-aprovacoes',
    rota: '/operacao/aprovacoes',
    legenda: 'Entregas aguardando aprovação da marca',
  },
  {
    id: 'producao-calendario',
    rota: '/operacao/calendario',
    legenda: 'O calendário de entregas',
  },
  {
    id: 'producao-licencas',
    rota: '/operacao/licencas',
    legenda: 'As licenças de uso do conteúdo e seus vencimentos',
  },
  {
    id: 'financeiro-monitor',
    rota: '/financeiro/monitor',
    legenda: 'O monitor financeiro, com indicadores e central de alertas',
  },
  {
    id: 'financeiro-contas',
    rota: '/financeiro/contas',
    legenda: 'As contas financeiras da agência',
  },
  {
    id: 'financeiro-receber',
    rota: '/financeiro/receber',
    legenda: 'Contas a receber, com indicadores e filtros',
  },
  {
    id: 'financeiro-pagar',
    rota: '/financeiro/pagar',
    legenda: 'Custos e pagamentos vinculados à campanha',
  },
  {
    id: 'financeiro-repasses',
    rota: '/financeiro/repasses-creators',
    legenda: 'Os repasses para influenciadores',
  },
  {
    id: 'financeiro-periodos',
    rota: '/financeiro/periodos',
    legenda: 'Os períodos financeiros e seu status de fechamento',
  },
  {
    id: 'financeiro-novo-lancamento',
    rota: '/financeiro/receber',
    legenda: 'O formulário de novo lançamento financeiro',
    async preparar(pagina) {
      await pagina.getByRole('button', { name: /Novo lançamento/i }).first().click();
      await pagina.waitForTimeout(1200);
    },
  },
  {
    id: 'integracoes-contas',
    rota: '/integracoes/contas',
    legenda: 'As contas conectadas de serviços externos',
  },
  {
    id: 'relatorios',
    rota: '/relatorios',
    legenda: 'O catálogo de relatórios por área',
  },
];
