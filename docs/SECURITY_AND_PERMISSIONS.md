# SECURITY AND PERMISSIONS

Papéis:
- PUBLIC
- CLIENT
- AGENT
- ADMIN

Princípios:
- A área de prospecção não deve ser pública.
- Usar permissões granulares.
- Registrar histórico e auditoria.
- Preservar soft delete, backup, restauração e ambientes separados.

## Diretrizes de Código Seguro
- **Validação de Entrada:** Validar e sanitizar rigorosamente todos os inputs fornecidos por usuários (prevenção contra XSS, SQL Injection, etc).
- **Gestão de Segredos:** Nunca colocar chaves de API, senhas ou tokens hardcoded no código; utilizar variáveis de ambiente ou cofres de senhas.
- **Princípio do Menor Privilégio:** Atribuir apenas os direitos mínimos necessários para executar uma operação, tanto em nível de banco de dados quanto nas APIs.
- **Tratamento de Erros:** Exibir mensagens de erro genéricas para o usuário para evitar o vazamento de stack traces ou detalhes sensíveis de infraestrutura.
- **Fail Securely:** Se ocorrer uma falha sistêmica durante um processo de autorização ou autenticação, a ação deve ser negada por padrão.
