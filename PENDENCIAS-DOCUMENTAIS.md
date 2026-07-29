# Pendências documentais

Divergências entre o que a documentação/UI sugere e o que o código do Mainstay realmente faz,
encontradas ao escrever a Central de Ajuda. O código foi tratado como fonte de verdade.

Data do levantamento: 2026-07-29
Fonte: `system/agency-campaign-os/AgencyCampaign` (leitura apenas)

---

## D1 — Conciliação bancária manual não existe (rótulos órfãos)

**Onde:** `AgencyCampaign.Application/Resources/Localization/AgencyCampaignResource.*.resx`,
chaves `financial.reconciliation.*` (cerca de 30 rótulos: "Conciliação bancária", "Importar
extrato", "Casar transação", "Saldo do banco", "Saldo Mainstay", "Desfazer", instruções de formato
`data;descrição;valor;C ou D`).

**Divergência:** nenhum componente do frontend referencia essas chaves. Não há rota, tela nem
serviço de importação de extrato ou de casamento manual de transações. Uma busca por
`reconciliation` no `AgencyCampaign.Web/src` retorna apenas `setAutoReconcile`.

**O que existe de fato:** conciliação **automática** de cobranças —
`IFinancialEntryService.ReconcileLiquidados` e `RunChargeSettlement`, ligadas por conta pelo toggle
**Consultar pagamentos** (`SetAutoReconcileCharges`) em Contas bancárias → Integrações. Ela cobre
apenas recebíveis com cobrança emitida pelo próprio Mainstay, correlacionados pelo identificador
enviado ao banco.

**Como está documentado:** `content/docs/financeiro/conciliacao.mdx` descreve a conciliação
automática e traz um aviso explícito de que não há importação de extrato.

**Ação sugerida:** decidir entre (a) implementar a tela de conciliação manual, ou (b) remover os
rótulos órfãos dos três `.resx` para não induzir a erro em futuras implementações.

---

## D2 — Aprovação comercial por política está desligada por flag

**Onde:** `AgencyCampaign.Web/src/config/features.ts` → `commercialApprovals: false`.

**Divergência:** o backend (`OpportunityApprovalRequestService`, `CommercialPolicy`), as permissões
(`opportunityApprovals.*`, `commercialPolicy.*`) e 127 rótulos `commercialApprovals.*` existem e
estão completos, mas a rota `/comercial/aprovacoes` redireciona para o funil e o item some do menu.
As mensagens `proposal.send.approvalRequired` e `proposal.send.approvalPending` existem e não são
alcançadas no fluxo atual.

**Como está documentado:** `content/docs/comercial/aprovacao-comercial.mdx` separa "aprovar a
proposta" (ativo) de "aprovação interna por política" (desligado), com aviso explícito.

**Ação sugerida:** confirmar se o gate volta antes do lançamento. Se voltar, revisar o artigo e o
`content/docs/comercial/configuracoes.mdx`.

---

## D3 — Régua de cobrança configurada porém sem canal de envio

**Onde:** `AgencyCampaign.Infrastructure/Services/Financial/CollectionReminderService.cs` e a tela
`Financeiro › Régua de cobrança`.

**Divergência:** regras, templates, variáveis, preview e o preset padrão estão implementados, mas o
envio depende de uma Conta de Integração ativa de e-mail ou WhatsApp. Sem conta conectada, a régua
fica configurada e não envia nada — e a tela não deixa isso evidente antes de o operador confiar
nela.

**Como está documentado:** `content/docs/financeiro/regua-de-cobranca.mdx` traz um alerta
orientando a conferir `Integrações › Contas` antes de considerar a régua ativa.

**Ação sugerida:** avaliar um aviso na própria tela de régua quando não houver conta ativa para o
canal das regras cadastradas.

---

## D4 — Duas mensagens de erro sem tradução

**Onde:** `AgencyCampaign.Infrastructure/Services/Financial/FinancialAccountService.cs` e
`FinancialEntryService.cs`.

**Divergência:** as chaves `financialAccount.charge.hasOpenCharges.cannotChangeBank`,
`financialAccount.charge.hasOpenCharges.cannotChangeConnector` e
`financialEntry.charge.hasOpenCharge.cannotChangeAccount` são lançadas pelo código mas **não existem
nos três `.resx`**. O usuário recebe a chave crua em vez da mensagem em português.

**Como está documentado:** os artigos
`content/docs/financeiro/contas-financeiras.mdx` e
`content/docs/solucao-de-problemas/conta-padrao-nao-configurada.mdx` descrevem o bloqueio em
linguagem natural, sem citar a chave.

**Ação sugerida:** adicionar as três chaves nos `.resx` pt-BR, en-US e es-AR.

---

## D5 — Vocabulário "creator" x "influenciador" misturado

**Onde:** rótulos pt-BR e formulários.

**Divergência:** a UI padronizou **"Influenciador"** (`creators.title = Influenciadores`,
`nav.item.creators = Influenciadores`), mas alguns campos ainda usam "creator":
`modal.financialEntry.field.creator = Creator (repasse)`,
`modal.proposalItem.option.noCreator = Sem creator`,
`financialEntry.duplicateCreatorPayout` (texto de erro cita "creator"),
`contentReview.author.creator = Criador`. As rotas também seguem `/creators`.

**Como está documentado:** os artigos usam "influenciador" e citam o rótulo literal da tela quando
ele diverge (por exemplo, "deixe **Sem creator**").

**Ação sugerida:** uniformizar os rótulos remanescentes nos `.resx`.

---

## D6 — Módulo "Operação" renomeado para "Produção" apenas na UI

**Onde:** `nav.group.operations = Produção`, mas as rotas continuam `/operacao/aprovacoes`,
`/operacao/calendario`, `/operacao/licencas`, e o código usa `Operations`.

**Divergência:** cosmética, mas relevante para quem escreve documentação ou dá suporte por
telefone — o usuário lê "Produção" e a URL diz "operacao".

**Como está documentado:** os artigos usam "Produção" (o que o usuário vê). Nenhuma URL do sistema é
citada nos artigos.

**Ação sugerida:** nenhuma no curto prazo; renomear rotas quebraria links salvos.

---

## Pontos não confirmados (não viraram artigo)

Itens que ficaram de fora ou foram descritos de forma genérica por não terem sido confirmados no
código com a profundidade necessária:

| Tema | Status |
| --- | --- |
| Validade padrão do link de aprovação de entregável (`/d/:token`) | Não confirmada. O artigo fala em "definida ao gerar" sem citar número de dias. |
| Validade padrão do link de relatório de campanha (`/r/:token`) | Idem. |
| Provedor da coleta automática de métricas e limites de uso | Não documentado. O artigo descreve apenas o botão **Atualizar métricas (auto)**. |
| Tipos de arquivo aceitos no upload de documentos de campanha | Não confirmado. `content/docs/solucao-de-problemas/arquivos-e-anexos.mdx` descreve só o que foi verificado (imagem na revisão de conteúdo, http(s) na NF). |
| Fluxo completo de assinatura digital (provedor, callbacks, reenvio) | Documentado apenas pela ótica de status do documento. |
| Retenções fiscais: quais tributos e como são calculados | Citado como relatório, sem detalhar regra de cálculo. |
| Cadastro de marcas e contatos | Sem artigo próprio; citado dentro do fluxo comercial. |
