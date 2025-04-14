// cli.ts
import axios from 'axios';
import inquirer from 'inquirer';
import chalk from 'chalk';

const API_BASE_URL = 'http://localhost:3000';

interface UF {
  id: number;
  nome: string;
  sigla: string;
}

interface Cidade {
  id: number;
  nome: string;
  uf?: {
    id: number;
    sigla: string;
  };
}

interface Estudante {
  id: number;
  nome: string;
  matricula: string;
  email: string;
  dt_nascimento: string;
  cidade?: {
    id: number;
    nome: string;
    uf?: {
      sigla: string;
    };
  };
}

async function main() {
    console.log(chalk.green.bold('\n🛠️  Interface CLI para o NestJS CRUD\n'));
  
    const { action } = await inquirer.prompt<{ action: string }>([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
          'Criar UF',
          'Listar UFs',
          'Remover UF',
          'Criar Cidade',
          'Listar Cidades', 
          'Remover Cidade',
          'Criar Estudante',
          'Listar Estudantes',
          'Remover Estudante',
          'Sair'
        ],
      },
    ]);

  switch (action) {
    case 'Criar UF':
      await criarUF();
      break;
    case 'Listar UFs':
      await listarUFs();
      break;
    case 'Criar Cidade':
      await criarCidade();
      break;
    case 'Listar Cidades':
      await listarCidades();
      break;
    case 'Criar Estudante':
      await criarEstudante();
      break;
    case 'Listar Estudantes':
      await listarEstudantes();
      break;
      case 'Remover UF':
        await removerUF();
        break;
      case 'Remover Cidade':
        await removerCidade();
        break;
      case 'Remover Estudante':
        await removerEstudante();
        break;
      case 'Sair':
        console.log(chalk.yellow('\nAté logo! 👋\n'));
        process.exit(0);
    }

  setTimeout(main, 1000);
}

// --- UF ---
async function criarUF() {
  const answers = await inquirer.prompt<{ nome: string; sigla: string }>([
    {
      type: 'input',
      name: 'nome',
      message: 'Nome da UF:',
    },
    {
      type: 'input',
      name: 'sigla',
      message: 'Sigla (2 letras):',
      validate: (input: string) => input.length === 2 || 'Sigla deve ter 2 caracteres!',
    },
  ]);

  try {
    const response = await axios.post<UF>(`${API_BASE_URL}/uf`, answers);
    console.log(chalk.green('\n✅ UF criada:'), response.data, '\n');
  } catch (error) {
    handleError(error);
  }
}

async function listarUFs() {
  try {
    const response = await axios.get<UF[]>(`${API_BASE_URL}/uf`);
    console.log(chalk.blue('\n📋 Lista de UFs:'));
    console.table(response.data);
  } catch (error) {
    handleError(error);
  }
}

async function removerUF() {
    const { ufId } = await listarUFsSimplificado();
    
    const { confirm } = await inquirer.prompt<{ confirm: boolean }>([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Tem certeza que deseja remover a UF com ID ${ufId}?`,
        default: false,
      },
    ]);
  
    if (!confirm) {
      console.log(chalk.yellow('Operação cancelada.'));
      return;
    }
  
    try {
      await axios.delete(`${API_BASE_URL}/uf/${ufId}`);
      console.log(chalk.green('\n✅ UF removida com sucesso!\n'));
    } catch (error) {
      handleError(error);
    }
  }

// --- Cidade ---
async function criarCidade() {
  const { ufId } = await listarUFsSimplificado();
  
  const answers = await inquirer.prompt<{ nome: string; ufId: string }>([
    {
      type: 'input',
      name: 'nome',
      message: 'Nome da Cidade:',
    },
    {
      type: 'input',
      name: 'ufId',
      message: `ID da UF (${ufId} selecionado):`,
      default: ufId.toString(),
      validate: (input: string) => !isNaN(Number(input)) || 'Digite um número válido!',
    },
  ]);

  try {
    const response = await axios.post<Cidade>(`${API_BASE_URL}/cidade`, {
      nome: answers.nome,
      ufId: Number(answers.ufId)
    });
    console.log(chalk.green('\n✅ Cidade criada:'), response.data, '\n');
  } catch (error) {
    handleError(error);
  }
}

async function listarCidades() {
  try {
    const response = await axios.get<Cidade[]>(`${API_BASE_URL}/cidade`);
    console.log(chalk.blue('\n📋 Lista de Cidades:'));
    console.table(response.data.map(cidade => ({
      id: cidade.id,
      nome: cidade.nome,
      uf: cidade.uf?.sigla || 'N/A'
    })));
  } catch (error) {
    handleError(error);
  }
}

async function listarUFsSimplificado(): Promise<{ ufId: number }> {
  try {
    const response = await axios.get<UF[]>(`${API_BASE_URL}/uf`);
    console.log(chalk.blue('\n📋 Selecione uma UF:'));
    console.table(response.data.map(uf => ({ id: uf.id, nome: uf.nome, sigla: uf.sigla })));
    
    const { ufId } = await inquirer.prompt<{ ufId: string }>([
      {
        type: 'input',
        name: 'ufId',
        message: 'Digite o ID da UF:',
        validate: (input: string) => !isNaN(Number(input)) || 'Digite um número válido!',
      },
    ]);
    return { ufId: Number(ufId) };
  } catch (error) {
    handleError(error);
    return { ufId: 0 };
  }
}

async function removerCidade() {
    const { cidadeId } = await listarCidadesSimplificado();
    
    const { confirm } = await inquirer.prompt<{ confirm: boolean }>([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Tem certeza que deseja remover a cidade com ID ${cidadeId}?`,
        default: false,
      },
    ]);
  
    if (!confirm) {
      console.log(chalk.yellow('Operação cancelada.'));
      return;
    }
  
    try {
      await axios.delete(`${API_BASE_URL}/cidade/${cidadeId}`);
      console.log(chalk.green('\n✅ Cidade removida com sucesso!\n'));
    } catch (error) {
      handleError(error);
    }
  }

// --- Estudante ---
async function criarEstudante() {
  const { cidadeId } = await listarCidadesSimplificado();
  
  const answers = await inquirer.prompt<{
    nome: string;
    matricula: string;
    email: string;
    dt_nascimento: string;
    cidadeId: string;
  }>([
    {
      type: 'input',
      name: 'nome',
      message: 'Nome do Estudante:',
    },
    {
      type: 'input',
      name: 'matricula',
      message: 'Matrícula:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Email:',
      validate: (input: string) => input.includes('@') || 'Email inválido!',
    },
    {
      type: 'input',
      name: 'dt_nascimento',
      message: 'Data de Nascimento (YYYY-MM-DD):',
    },
    {
      type: 'input',
      name: 'cidadeId',
      message: `ID da Cidade (${cidadeId} selecionado):`,
      default: cidadeId.toString(),
      validate: (input: string) => !isNaN(Number(input)) || 'Digite um número válido!',
    },
  ]);

  try {
    const response = await axios.post<Estudante>(`${API_BASE_URL}/estudante`, {
      nome: answers.nome,
      matricula: answers.matricula,
      email: answers.email,
      dt_nascimento: answers.dt_nascimento,
      cidadeId: Number(answers.cidadeId)
    });
    console.log(chalk.green('\n✅ Estudante criado:'), response.data, '\n');
  } catch (error) {
    handleError(error);
  }
}

async function listarEstudantes() {
  try {
    const response = await axios.get<Estudante[]>(`${API_BASE_URL}/estudante`);
    console.log(chalk.blue('\n📋 Lista de Estudantes:'));
    console.table(response.data.map(estudante => ({
      id: estudante.id,
      nome: estudante.nome,
      cidade: estudante.cidade?.nome || 'N/A',
      uf: estudante.cidade?.uf?.sigla || 'N/A'
    })));
  } catch (error) {
    handleError(error);
  }
}

async function listarCidadesSimplificado(): Promise<{ cidadeId: number }> {
  try {
    const response = await axios.get<Cidade[]>(`${API_BASE_URL}/cidade`);
    console.log(chalk.blue('\n📋 Selecione uma Cidade:'));
    console.table(response.data.map(cidade => ({ 
      id: cidade.id, 
      nome: cidade.nome, 
      uf: cidade.uf?.sigla || 'N/A' 
    })));
    
    const { cidadeId } = await inquirer.prompt<{ cidadeId: string }>([
      {
        type: 'input',
        name: 'cidadeId',
        message: 'Digite o ID da Cidade:',
        validate: (input: string) => !isNaN(Number(input)) || 'Digite um número válido!',
      },
    ]);
    return { cidadeId: Number(cidadeId) };
  } catch (error) {
    handleError(error);
    return { cidadeId: 0 };
  }
}

async function removerEstudante() {
    const { estudanteId } = await listarEstudantesSimplificado();
    
    const { confirm } = await inquirer.prompt<{ confirm: boolean }>([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Tem certeza que deseja remover o estudante com ID ${estudanteId}?`,
        default: false,
      },
    ]);
  
    if (!confirm) {
      console.log(chalk.yellow('Operação cancelada.'));
      return;
    }
  
    try {
      await axios.delete(`${API_BASE_URL}/estudante/${estudanteId}`);
      console.log(chalk.green('\n✅ Estudante removido com sucesso!\n'));
    } catch (error) {
      handleError(error);
    }
  }

  async function listarEstudantesSimplificado(): Promise<{ estudanteId: number }> {
    try {
      const response = await axios.get<Estudante[]>(`${API_BASE_URL}/estudante`);
      console.log(chalk.blue('\n📋 Selecione um Estudante:'));
      console.table(response.data.map(estudante => ({
        id: estudante.id,
        nome: estudante.nome,
        cidade: estudante.cidade?.nome || 'N/A'
      })));
      
      const { estudanteId } = await inquirer.prompt<{ estudanteId: string }>([
        {
          type: 'input',
          name: 'estudanteId',
          message: 'Digite o ID do Estudante:',
          validate: (input: string) => !isNaN(Number(input)) || 'Digite um número válido!',
        },
      ]);
      return { estudanteId: Number(estudanteId) };
    } catch (error) {
      handleError(error);
      return { estudanteId: 0 };
    }
  }
function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    console.error(chalk.red('\n❌ Erro:'), error.response?.data?.message || error.message, '\n');
  } else if (error instanceof Error) {
    console.error(chalk.red('\n❌ Erro:'), error.message, '\n');
  } else {
    console.error(chalk.red('\n❌ Erro desconhecido'), '\n');
  }
}

// Inicia a interface
main();