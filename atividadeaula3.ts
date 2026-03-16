// ISP: Interfaces segregadas por responsabilidade

interface Trabalhavel {
    trabalhar(): void;
}

interface RegistraPonto {
    registrarPonto(): void;
}

interface Assalariado {
    receberSalario(): void;
}

interface Gerenciavel {
    gerenciarEquipe(): void;
}

interface Programavel {
    escreverCodigo(): void;
}

// LSP: Cada classe implementa APENAS as interfaces que usa
// nenhuma precisa lançar Error por método irrelevante

class Gerente implements Trabalhavel, RegistraPonto, Assalariado, Gerenciavel {
    trabalhar(): void {
        console.log("Gerente trabalhando");
    }
    registrarPonto(): void {
        console.log("Ponto registrado");
    }
    receberSalario(): void {
        console.log("Salário recebido");
    }
    gerenciarEquipe(): void {
        console.log("Gerenciando equipe");
    }
}

class Desenvolvedor implements Trabalhavel, RegistraPonto, Assalariado, Programavel {
    trabalhar(): void {
        console.log("Desenvolvedor trabalhando");
    }
    registrarPonto(): void {
        console.log("Ponto registrado");
    }
    receberSalario(): void {
        console.log("Salário recebido");
    }
    escreverCodigo(): void {
        console.log("Escrevendo código");
    }
}

class Estagiario implements Trabalhavel, RegistraPonto, Programavel {
    trabalhar(): void {
        console.log("Estagiário trabalhando");
    }
    registrarPonto(): void {
        console.log("Ponto registrado");
    }
    escreverCodigo(): void {
        console.log("Estagiário escrevendo código");
    }
}

// Parte 3: Freelancer adicionado SEM modificar nenhuma classe
// existente — demonstra que a refatoração é extensível


class Freelancer implements Trabalhavel, Programavel {
    trabalhar(): void {
        console.log("Freelancer trabalhando");
    }
    escreverCodigo(): void {
        console.log("Freelancer escrevendo código");
    }
}

// DIP: SistemaRH depende de abstrações (interfaces),
// recebe dependências via construtor (Injeção de DI)

class SistemaRH {
    private trabalhadores: Trabalhavel[];
    private registradores: RegistraPonto[];
    private assalariados: Assalariado[];

    constructor(
        trabalhadores: Trabalhavel[],
        registradores: RegistraPonto[],
        assalariados: Assalariado[]
    ) {
        this.trabalhadores = trabalhadores;
        this.registradores = registradores;
        this.assalariados = assalariados;
    }

    iniciarExpediente(): void {
        console.log("--- Iniciando expediente ---");
        this.trabalhadores.forEach((f) => f.trabalhar());
    }

    registrarPontos(): void {
        console.log("--- Registrando pontos ---");
        this.registradores.forEach((f) => f.registrarPonto());
    }

    processarFolha(): void {
        console.log("--- Processando folha de pagamento ---");
        this.assalariados.forEach((f) => f.receberSalario());
    }
}

// Uso — SistemaRH não sabe quais classes concretas existem


const gerente = new Gerente();
const dev = new Desenvolvedor();
const estagiario = new Estagiario();
const freelancer = new Freelancer(); // adicionado sem tocar em nada acima

const sistema = new SistemaRH(
    [gerente, dev, estagiario, freelancer],  // todos trabalham
    [gerente, dev, estagiario],              // freelancer não registra ponto
    [gerente, dev]                           // apenas assalariados
);

sistema.iniciarExpediente();
sistema.registrarPontos();
sistema.processarFolha();