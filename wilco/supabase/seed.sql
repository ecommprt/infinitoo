-- ============================================================
-- SEED: Pátio Batel – Terraço Junino 2025
-- Rodar no SQL Editor do Supabase após criar as tabelas
-- ============================================================

-- 1. Evento
insert into events (id, name, client, start_date, end_date) values
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Terraço Junino 2025', 'Pátio Batel', '2025-06-06', '2025-06-15');

-- 2. TM Days (3 dias da 2ª semana – os que têm TM na planilha)
insert into tm_days (id, event_id, date, label, day_of_week) values
  ('d0000000-0000-0000-0000-000000000001', 'a1b2c3d4-0000-0000-0000-000000000001', '2025-06-13', 'Sexta, 13/06', 'Sexta-feira'),
  ('d0000000-0000-0000-0000-000000000002', 'a1b2c3d4-0000-0000-0000-000000000001', '2025-06-14', 'Sábado, 14/06', 'Sábado'),
  ('d0000000-0000-0000-0000-000000000003', 'a1b2c3d4-0000-0000-0000-000000000001', '2025-06-15', 'Domingo, 15/06', 'Domingo');

-- 3. TM Tasks – SEXTA 13/06
insert into tm_tasks (day_id, time, activity, assignee) values
  ('d0000000-0000-0000-0000-000000000001', '08h', 'Descarga de materiais e insumos', 'Restaurantes'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Pegar ombrelones e bases de plástico s4 para bares', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Conferir cenografia', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Chegada martelo ajustado', 'Ivan'),
  ('d0000000-0000-0000-0000-000000000001', '09h', 'Ajustes finais camarim', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Pegar figurinos lavados no s2', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Arrumar rádios produção', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Arrumar os dardos', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Colocar PS de caixa nos pirulitos', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000001', '10h30', 'Trocar rádio que está falhando', 'Voix Telecom'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Ver onde vão ficar as barraquinhas de gastronomia', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Enviar lista credenciamento para o fds (Limoeiro, Auau, Mob, Parfait)', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Fazer lista do que precisa ser guardado na desmontagem', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Comprar água', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', '15h', 'Posicionar mobiliário externo (Ponto Gin, Ponto Vin, Quintana)', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Posicionar mobiliário das brincadeiras no lugar correto', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Posicionar ombrelones externos', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Colocação do corrugado nas barracas', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Arrumar mobiliário interno', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Recolocar fenos', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Limpeza área externa', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Conferir e etiquetar transformadores Infinitoo Crepe Monet', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', '16h', 'Chegada Arte recreadores e recepcionistas – figurino e make', 'Operação Lazer'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Chegada do segurança – 1 pax', 'Esplendor'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Limpeza do camarim', 'Esplendor'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Ajustar luz dardo', null),
  ('d0000000-0000-0000-0000-000000000001', null,  'Chegada Lenhadores', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Levar objetos para área kids', 'Operação Lazer'),
  ('d0000000-0000-0000-0000-000000000001', '17h', 'Check geral elétrica', 'Wolts'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Passagem de som Lenhadores', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Chegada Xaxadinhos', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000001', '17h45', 'Recreadores e recepcionistas posicionados – música mecânica ligada', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', '18h', 'ABERTURA – música mecânica', 'Vero e Gabi'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Montagem Xaxadinhos – entregar água', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000001', '18h30', 'Show Xaxadinhos (até 20h)', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000001', '19h30', 'Chegada Lenhadores', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000001', '20h', 'Desmontagem Xaxadinhos – música mecânica', 'Som'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Montagem Lenhadores – entregar água', 'Som e Gabi'),
  ('d0000000-0000-0000-0000-000000000001', '20h30', 'Show Lenhadores da Antártida (até 22h)', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000001', '22h', 'ENCERRAMENTO – retirar objetos barracas + corrugado', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Retirar objetos área kids', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Limpeza geral', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Contagem caixa', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Carregar rádios e maquinetas', 'Vero'),
  ('d0000000-0000-0000-0000-000000000001', null,  'Trancar camarim, geladeiras e freezer', 'Vero');

-- 4. TM Tasks – SÁBADO 14/06
insert into tm_tasks (day_id, time, activity, assignee) values
  ('d0000000-0000-0000-0000-000000000002', '10h', 'Chegada carregadores e limpeza', 'Vero'),
  ('d0000000-0000-0000-0000-000000000002', null,  'Limpeza camarim e cozinha', 'Esplendor'),
  ('d0000000-0000-0000-0000-000000000002', null,  'Organização do camarim', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000002', null,  'Chegada Crimson Bull', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000002', '10h30', 'Chegada segurança', 'Vero'),
  ('d0000000-0000-0000-0000-000000000002', null,  'Organizar mesas (tenda, área Kids e área interna)', 'Vero'),
  ('d0000000-0000-0000-0000-000000000002', null,  'Colocar papel corrugado', 'Carregadores'),
  ('d0000000-0000-0000-0000-000000000002', '10h45', 'Chegada recreacionistas e recepcionistas – maquiagem e figurino', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000002', null,  'Chegada equipe restaurantes', 'Restaurantes'),
  ('d0000000-0000-0000-0000-000000000002', '11h', 'Passagem de som Crimson Bull', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000002', '11h45', 'Recreadores posicionados – música mecânica ligada', 'Vero'),
  ('d0000000-0000-0000-0000-000000000002', '12h', 'ABERTURA – música mecânica', 'Vero e Gabi'),
  ('d0000000-0000-0000-0000-000000000002', '13h', 'Show Areia Branca + Casal dançarinos (até 15h)', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000002', '15h', 'Desmontagem / música mecânica', 'Som'),
  ('d0000000-0000-0000-0000-000000000002', null,  'Montagem Crimson Bull – entregar água', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000002', '15h30', 'Show Crimson Bull (até 17h30)', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000002', '17h30', 'Desmontagem Crimson Bull – música mecânica', 'Som'),
  ('d0000000-0000-0000-0000-000000000002', '22h', 'ENCERRAMENTO – retirar objetos barracas + corrugado', 'Vero'),
  ('d0000000-0000-0000-0000-000000000002', null,  'Limpeza geral', 'Vero'),
  ('d0000000-0000-0000-0000-000000000002', null,  'Trancar camarim, geladeiras e freezer', 'Vero');

-- 5. TM Tasks – DOMINGO 15/06
insert into tm_tasks (day_id, time, activity, assignee) values
  ('d0000000-0000-0000-0000-000000000003', '10h', 'Chegada carregadores e limpeza', 'Vero'),
  ('d0000000-0000-0000-0000-000000000003', null,  'Ver elétrica Limoeiro', 'Wolts'),
  ('d0000000-0000-0000-0000-000000000003', null,  'Arrumar argola e ver pau de fita', 'Mob'),
  ('d0000000-0000-0000-0000-000000000003', null,  'Arrumar espaço martelo', null),
  ('d0000000-0000-0000-0000-000000000003', '10h30', 'Chegada segurança', 'Vero'),
  ('d0000000-0000-0000-0000-000000000003', null,  'Organizar mesas (tenda, área kids e área interna)', 'Carregadores'),
  ('d0000000-0000-0000-0000-000000000003', null,  'Colocar papel corrugado barracas', 'Carregadores'),
  ('d0000000-0000-0000-0000-000000000003', '10h45', 'Chegada recreacionistas e recepcionistas – maquiagem e figurino', 'Vero'),
  ('d0000000-0000-0000-0000-000000000003', null,  'Chegada equipe restaurantes', 'Restaurantes'),
  ('d0000000-0000-0000-0000-000000000003', '11h30', 'Recreadores posicionados – música mecânica ligada', 'Vero'),
  ('d0000000-0000-0000-0000-000000000003', '12h', 'ABERTURA – música mecânica', 'Vero e Gabi'),
  ('d0000000-0000-0000-0000-000000000003', '13h', 'Show Areia Branca + Casal dançarinos (até 15h)', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000003', '15h', 'Desmontagem / música mecânica', 'Som'),
  ('d0000000-0000-0000-0000-000000000003', null,  'Montagem Iara Trio – entregar água', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000003', '15h30', 'Show Iara Trio (até 17h30)', 'Gabi'),
  ('d0000000-0000-0000-0000-000000000003', '17h30', 'Desmontagem Iara Trio – música mecânica', 'Som'),
  ('d0000000-0000-0000-0000-000000000003', '20h', 'ENCERRAMENTO', 'Vero'),
  ('d0000000-0000-0000-0000-000000000003', null,  'Limpeza geral', 'Vero'),
  ('d0000000-0000-0000-0000-000000000003', null,  'Guardar todos os objetos', 'Vero');

-- 6. Schedule tasks (Cronograma de pré-produção – principais)
insert into schedule_tasks (event_id, category, title, assignee, start_date, end_date, pct_complete) values
  -- Tendas
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Tendas', 'Definir quantidades e tamanhos tendas', 'Infinitoo', '2025-02-20', '2025-03-28', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Tendas', 'Incluir tendas no projeto', 'Retail Lab', '2025-02-28', '2025-03-21', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Tendas', 'Orçar tendas e box truss', 'Infinitoo', '2025-03-21', '2025-05-15', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Tendas', 'Contratar empresa de tendas e box truss', 'Infinitoo', '2025-04-04', '2025-05-16', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Tendas', 'Montar a estrutura das tendas e box truss', 'Infinitoo', '2025-05-26', '2025-06-02', 0),
  -- Cenografia
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Cenografia', 'Criar projeto cenográfico', 'Retail Lab', '2025-02-28', '2025-04-04', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Cenografia', 'Aprovar projeto cenográfico', 'Pátio Batel', '2025-04-07', '2025-04-16', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Cenografia', 'Contratar construção da cenografia', 'Infinitoo', '2025-05-02', '2025-05-07', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Cenografia', 'Montar cenografia', 'Infinitoo', '2025-06-02', '2025-06-04', 0),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Cenografia', 'Desmontagem cenografia', 'Infinitoo', '2025-06-16', '2025-06-17', 0),
  -- Iluminação
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Iluminação', 'Contratar iluminação', 'Infinitoo', '2025-03-21', '2025-05-14', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Iluminação', 'Instalar infra-estrutura e refletores', 'Infinitoo', '2025-06-03', '2025-06-05', 0),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Iluminação', 'Afinar iluminação', 'Infinitoo', '2025-06-04', '2025-06-05', 0),
  -- Som
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Som', 'Contratar sonorização', 'Infinitoo', '2025-03-21', '2025-05-14', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Som', 'Instalar equipamento de som', 'Infinitoo', '2025-06-03', '2025-06-05', 0),
  -- Bandas
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Bandas', 'Definir e cotar bandas', 'Infinitoo', '2025-02-20', '2025-03-21', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Bandas', 'Contratar bandas', 'Infinitoo', '2025-03-21', '2025-05-15', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Bandas', 'Marcar passagens de som', 'Infinitoo', '2025-05-05', '2025-05-28', 80),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Bandas', 'Passagens de som (dias de evento)', 'Infinitoo', '2025-06-05', '2025-06-15', 0),
  -- Figurino
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Figurino', 'Inventário figurino existente', 'Pátio Batel', '2025-04-04', '2025-05-07', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Figurino', 'Comprar figurino extra', 'Infinitoo', '2025-05-09', '2025-05-27', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Figurino', 'Ajustes figurino', 'Infinitoo', '2025-05-26', '2025-06-03', 50),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Figurino', 'Acionar lavanderia', 'Infinitoo', '2025-06-09', '2025-06-16', 0),
  -- Equipe
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Equipe', 'Contratar recepcionistas', 'Infinitoo', '2025-04-04', '2025-05-13', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Equipe', 'Fechar recreação', 'Infinitoo', '2025-04-04', '2025-05-05', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Equipe', 'Produzir material brincadeiras', 'Infinitoo', '2025-04-04', '2025-05-30', 80),
  -- Restaurantes
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Restaurantes', 'Fechar restaurantes', 'Infinitoo', '2025-03-17', '2025-05-05', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Restaurantes', 'Fazer contratos restaurantes', 'Infinitoo', '2025-04-04', '2025-05-28', 80),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Restaurantes', 'Aprovar cardápios e valores', 'Pátio Batel', '2025-04-22', '2025-05-28', 60),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Restaurantes', 'Entregar e instalar placas dos restaurantes', 'Pátio Batel', '2025-05-16', '2025-06-02', 0),
  -- Elétrica
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Elétrica', 'Contratar eletricista', 'Infinitoo', '2025-03-21', '2025-05-28', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Elétrica', 'Definir pontos de tomada e luz', 'Infinitoo', '2025-04-04', '2025-05-09', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Elétrica', 'Fazer instalação elétrica', 'Infinitoo', '2025-06-04', '2025-06-05', 0),
  -- Extras
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Extras', 'Pagar ECAD', 'Infinitoo', '2025-04-22', '2025-05-28', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Extras', 'Contratar seguro', 'Infinitoo', '2025-04-04', '2025-05-12', 100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Extras', 'Impressões comunicação visual', 'Pátio Batel', '2025-04-22', '2025-05-23', 50);

-- 7. Budget items (principais categorias do orçamento)
insert into budget_items (event_id, category, item, supplier, responsible, qty, unit_price, estimated, confirmed) values
  -- Gastronomia
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Gastronomia', 'Barraca 01 | Salgado e Doce', 'Quintana', 'Infinitoo', 1, 0, 0, 0),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Gastronomia', 'Barraca 02 | Salgado e Doce', 'Limoeiro', 'Infinitoo', 1, 0, 0, 0),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Gastronomia', 'Barraca 06 | Crepe', 'Crepe Monet', 'Infinitoo', 1, 0, 0, 0),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Gastronomia', 'Barraca 07 | Salgado e Doce', 'Stro', 'Infinitoo', 1, 0, 0, 0),
  -- Atrações
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Atrações', 'Forrozin', 'Forrozin', 'Infinitoo', 1, 3000, 3000, 3000),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Atrações', 'Iara Trio', 'Iara Trio', 'Infinitoo', 1, 3100, 3100, 3100),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Atrações', 'Areia Branca', 'Areia Branca', 'Infinitoo', 2, 4100, 8200, 8200),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Atrações', 'Casal dançarinos de Forró', null, 'Infinitoo', 2, 800, 1600, 1600),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Atrações', 'Crimson Bull Rising', null, 'Infinitoo', 1, 0, 0, 0),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Atrações', 'Boibolé – Espetáculo Folclórico', null, 'Infinitoo', 1, 0, 0, 0),
  -- Infraestrutura
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Infraestrutura', 'Som + ART', null, 'Infinitoo', 1, 0, 0, 0),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Infraestrutura', 'Iluminação + ART', null, 'Infinitoo', 1, 0, 0, 0),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Infraestrutura', 'Sistema elétrico + ART', null, 'Infinitoo', 1, 0, 0, 0),
  -- Serviços
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Serviços', 'Equipe Limpeza – 4 pax/dia (6 dias)', 'Esplendor', 'Infinitoo', 6, 0, 0, 0),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Serviços', 'Carregadores – 2 pax/dia (6 dias)', null, 'Infinitoo', 6, 0, 0, 0),
  -- Cenografia (valores da planilha 2022 como referência)
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Cenografia', 'Coreto', 'Promova', 'Infinitoo', 1, 9200, 9200, 8448.55),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Cenografia', 'Barraca gastronomia', 'Promova', 'Infinitoo', 7, 5500, 38500, 33579.63),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Cenografia', 'Vila Cenográfica', 'Promova', 'Infinitoo', 1, 18300, 18300, 13859.89),
  ('a1b2c3d4-0000-0000-0000-000000000001', 'Cenografia', 'Pórtico de entrada', null, 'Infinitoo', 1, 0, 6900, 6900);
