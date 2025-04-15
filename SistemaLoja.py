class Produto:
    def __init__(self, nome, preco, estoque):
        self.nome = nome
        self.preco = preco
        self.estoque = estoque

    def aplicar_desconto(self, percentual):
        self.preco -= self.preco * (percentual / 100)

    def atualizar_estoque(self, quantidade):
        self.estoque -= quantidade


class Loja:
    def __init__(self):
        self.produtos = []
        self.carrinho = {}

    def adicionar_produto(self, produto):
        self.produtos.append(produto)

    def listar_produtos(self):
        for i, p in enumerate(self.produtos, 1):
            print(f"{i}. {p.nome} - R${p.preco:.2f} - Estoque: {p.estoque}")

    def adicionar_ao_carrinho(self, indice, quantidade):
        produto = self.produtos[indice - 1]
        if produto.estoque >= quantidade:
            if produto in self.carrinho:
                self.carrinho[produto] += quantidade
            else:
                self.carrinho[produto] = quantidade
            produto.atualizar_estoque(quantidade)
            print("Produto adicionado ao carrinho.\n")
        else:
            print("Estoque insuficiente.")

    def visualizar_carrinho(self):
        total = 0
        for p, q in self.carrinho.items():
            subtotal = p.preco * q
            print(f"{p.nome} x{q} - R${subtotal:.2f}")
            total += subtotal
        print(f"Total: R${total:.2f}\n")
        return total

    def simular_pagamento(self):
        total = self.visualizar_carrinho()
        print("[Formas de pagamento]:\n1. Dinheiro (10% desconto)\n2. Pix (5% desconto)\n3. Cartão (em até 3x com 10% de acréscimo)")
        opcao = input("Escolha a forma de pagamento: ")
        if opcao == '1':
            total *= 0.90
            print(f"Total com desconto: R${total:.2f}")
        elif opcao == '2':
            total *= 0.95
            print(f"Total com desconto: R${total:.2f}")
        elif opcao == '3':
            total *= 1.10
            parcelas = int(input("Em quantas vezes? (1 a 3): "))
            if 1 <= parcelas <= 3:
                print(f"Total com acréscimo: R${total:.2f} em {parcelas}x de R${total/parcelas:.2f}")
            else:
                print("Número de parcelas inválido.")
        else:
            print("Opção inválida.")


loja = Loja()
loja.adicionar_produto(Produto("Teclado", 430.0, 16))
loja.adicionar_produto(Produto("Smartwatch ", 700.0, 9))
loja.adicionar_produto(Produto("Controle", 300.0, 23))

while True:
    print("\nMenu:\n1. Listar produtos\n2. Adicionar ao carrinho\n3. Ver carrinho\n4. Simular pagamento\n5. Sair")
    escolha = input("\nEscolha uma opção: ")

    if escolha == '1':
        loja.listar_produtos()
    elif escolha == '2':
        loja.listar_produtos()
        i = int(input("\nDigite o número do produto: "))
        q = int(input("Quantidade: "))
        loja.adicionar_ao_carrinho(i, q)
    elif escolha == '3':
        loja.visualizar_carrinho()
    elif escolha == '4':
        loja.simular_pagamento()
    elif escolha == '5':
        print('Saindo...')
        break
    else:
        print("Opção inválida.")