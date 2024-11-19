MAX_ATTEMPTS = 5  # Limite de tentativas inválidas
attempt_count = 0  # Contador de tentativas

if user_exists(new_username):
    return Error("Já existe um usuário com esse nome.")

MIN_PASSWORD_LENGTH = 8

if len(new_password) < MIN_PASSWORD_LENGTH:
    return Error(f"Senha deve ter pelo menos {MIN_PASSWORD_LENGTH} caracteres.")

password = new_password

while attempt_count < MAX_ATTEMPTS:
    is_valid_credentials = lookup_credentials_in_database(new_username, password)

    if not is_valid_credentials:
        attempt_count += 1
        if attempt_count >= MAX_ATTEMPTS:
            return Error("Muitas tentativas inválidas. Conta bloqueada.")
        else:
            return Error("Usuário ou senha incorretos.")  
    break

return "Login realizado com sucesso!"
