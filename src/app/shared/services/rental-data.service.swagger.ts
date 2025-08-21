/**
 * @swagger
 * components:
 *   schemas:
 *     Aluguel:
 *       type: object
 *       required:
 *         - dataAluguel
 *         - modeloCarro
 *         - kmCarro
 *         - nomeCliente
 *         - telefoneCliente
 *         - dataDevolucao
 *         - valor
 *         - pago
 *       properties:
 *         dataAluguel:
 *           type: string
 *           format: date
 *           description: Data do aluguel no formato DD/MM/YYYY
 *           example: "15/03/2024"
 *         modeloCarro:
 *           type: string
 *           description: Modelo do carro alugado
 *           example: "Gol G6"
 *         kmCarro:
 *           type: integer
 *           description: Quilometragem do carro no momento do aluguel
 *           example: 45000
 *         nomeCliente:
 *           type: string
 *           description: Nome completo do cliente
 *           example: "João Silva"
 *         telefoneCliente:
 *           type: string
 *           description: Telefone de contato do cliente
 *           example: "(11) 98765-4321"
 *         dataDevolucao:
 *           type: string
 *           format: date
 *           description: Data prevista para devolução no formato DD/MM/YYYY
 *           example: "20/03/2024"
 *         valor:
 *           type: number
 *           format: float
 *           description: Valor total do aluguel
 *           example: 350.00
 *         pago:
 *           type: string
 *           description: Status de pagamento do aluguel
 *           enum: [SIM, NAO]
 *           example: "SIM"
 * 
 *     Carro:
 *       type: object
 *       required:
 *         - id
 *         - modelo
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único do carro
 *           example: 1
 *         modelo:
 *           type: string
 *           description: Modelo do carro
 *           example: "Gol G6"
 * 
 *     ListarAlugueisResponse:
 *       type: object
 *       properties:
 *         alugueis:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Aluguel'
 *         valorTotalNaoPago:
 *           type: number
 *           format: float
 *           description: Soma total dos valores não pagos
 *           example: 200.00
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Código do erro
 *           example: "INVALID_REQUEST"
 *         message:
 *           type: string
 *           description: Mensagem descritiva do erro
 *           example: "Requisição inválida"
 *         timestamp:
 *           type: string
 *           format: date-time
 *           example: "2024-03-15T10:30:00Z"
 *         path:
 *           type: string
 *           example: "/api/alugueis/listar"
 */

/**
 * @swagger
 * tags:
 *   - name: Aluguéis
 *     description: Operações relacionadas ao gerenciamento de aluguéis de veículos
 *   - name: Carros
 *     description: Operações relacionadas ao gerenciamento de carros disponíveis
 */

/**
 * @swagger
 * /api/alugueis/listar:
 *   get:
 *     tags:
 *       - Aluguéis
 *     summary: Listar todos os aluguéis
 *     description: Retorna uma lista completa de todos os aluguéis cadastrados no sistema
 *     parameters:
 *       - name: pago
 *         in: query
 *         description: Filtrar aluguéis por status de pagamento
 *         required: false
 *         schema:
 *           type: string
 *           enum: [SIM, NAO]
 *       - name: dataInicio
 *         in: query
 *         description: Filtrar aluguéis a partir desta data (formato DD/MM/YYYY)
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *       - name: dataFim
 *         in: query
 *         description: Filtrar aluguéis até esta data (formato DD/MM/YYYY)
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Lista de aluguéis retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListarAlugueisResponse'
 *       400:
 *         description: Requisição inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/carros:
 *   get:
 *     tags:
 *       - Carros
 *     summary: Listar carros disponíveis
 *     description: Retorna uma lista de todos os carros cadastrados no sistema
 *     responses:
 *       200:
 *         description: Lista de carros retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Carro'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/alugueis/processar:
 *   post:
 *     tags:
 *       - Aluguéis
 *     summary: Processar arquivo de aluguéis
 *     description: Processa um arquivo de aluguéis no formato RTN
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo RTN contendo os dados dos aluguéis
 *     responses:
 *       200:
 *         description: Arquivo processado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Arquivo processado com sucesso. 150 aluguéis cadastrados."
 *                 totalRegistros:
 *                   type: integer
 *                   example: 150
 *                 registrosProcessados:
 *                   type: integer
 *                   example: 150
 *                 registrosRejeitados:
 *                   type: integer
 *                   example: 0
 *       400:
 *         description: Arquivo inválido ou formato incorreto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       413:
 *         description: Arquivo muito grande
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
