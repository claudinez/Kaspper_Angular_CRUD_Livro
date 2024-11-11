import { Injectable } from '@angular/core';
import { Livro } from '../models/livro.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private livros: Livro[] = [
    { idlivro: 1, titulo: 'João e Maria', autor: 'Os Irmãos Grimm', editora: 'Nova Fronteira', anopublicacao: '2021-05-15', isbn: 9786585827010, emprestado: 'sim' },
    { idlivro: 2, titulo: 'Harry Potter', autor: 'J.K. Rowling', editora: 'Nova Fronteira', anopublicacao: '2020-03-22', isbn: 8532511015, emprestado: 'sim' },
    { idlivro: 3, titulo: 'O Sol é Para Todos', autor: 'Harper Lee', editora: 'Nova Fronteira', anopublicacao: '2020-03-22', isbn: 8532511015, emprestado: 'não' },
    { idlivro: 4, titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry', editora: 'Nova Fronteira', anopublicacao: '2020-03-22', isbn: 8532511015, emprestado: 'não' },
    { idlivro: 5, titulo: 'Romeu E Julieta', autor: 'William Shakespeare', editora: 'William Shakespeare', anopublicacao: '2020-03-22', isbn: 8532511015, emprestado: 'não' },
    { idlivro: 6, titulo: 'As Mil e Uma Noites,', autor: 'diversos autores', editora: 'Nova Fronteira', anopublicacao: '2020-03-22', isbn: 8532511015, emprestado: 'não' },

  ];

  constructor() {}

  getLivros(): Livro[] {
    return this.livros;
  }

  addLivro(livro: Livro): void {
    this.livros.push(livro);
  }

  editarLivro(id: number, livro: Livro): void {
    const index = this.livros.findIndex(f => f.idlivro === id);
    if (index !== -1) {
        this.livros[index] = { ...livro }; // Preserva o idlivro original
  }
}

  emprestarLivro(id: number): void {
    const livro = this.livros.find(f => f.idlivro === id);
    if (livro) {
      livro.emprestado = livro.emprestado === 'sim' ? 'não' : 'sim';
    }
  }

  deletarLivro(id: number): void {
    const index = this.livros.findIndex(f => f.idlivro === id);
    if (index !== -1) {
        const confirma = confirm("Tem certeza que deseja deletar este livro?");
      if (confirma) {
      this.livros.splice(index, 1);
    }
   }
  }
}
