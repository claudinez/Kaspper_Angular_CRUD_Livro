import { LivroService } from './../../services/livro.service';
import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/models/livro.model';

@Component({
  selector: 'app-livro-list',
  templateUrl: './livro-list.component.html',
  styleUrls: ['./livro-list.component.css']
})
export class LivroListComponent implements OnInit {
  livros: Livro[] =[]

  constructor(private livroService: LivroService) { }

  ngOnInit(): void {
    this.livros = this.livroService.getLivros();
  }

  deletarlivro(idLivro:number): void{
    this.livroService.deletarLivro(idLivro);
    this.livros = this.livroService.getLivros();
  }

  emprestarLivro(id: number): void {
    const livro = this.livros.find(f => f.idlivro === id);
  
    if (livro) {
      if (livro.emprestado === 'sim') {
        // Se o livro já está emprestado, perguntar se o usuário quer devolvê-lo
        const confirmarDevolucao = confirm('Este livro já está emprestado. Deseja devolvê-lo?');
        if (confirmarDevolucao) {
          this.livroService.emprestarLivro(id); // Altera o status do livro para disponível
          alert('Livro devolvido com sucesso!');
        }
      } else {
        // Se o livro está disponível, perguntar se o usuário quer emprestá-lo
        const confirmarEmprestimo = confirm('Deseja emprestar este livro?');
        if (confirmarEmprestimo) {
          this.livroService.emprestarLivro(id); // Altera o status do livro para emprestado
          alert('Livro emprestado com sucesso!');
        }
      }
    }
    
    // Atualiza a lista após a ação
    this.livros = this.livroService.getLivros();
  }
}
