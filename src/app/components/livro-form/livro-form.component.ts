import { Router } from '@angular/router';
import { LivroService } from './../../services/livro.service';
import { Livro } from 'src/app/models/livro.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importe o FormsModule

@Component({
  selector: 'app-livro-form',
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.css']
})

export class LivroFormComponent implements OnInit {
confirmarEdicao() {
throw new Error('Method not implemented.');
}

  livro: Livro = { idlivro: 0, titulo: '', autor: '', editora: '', anopublicacao: '', isbn: 0, emprestado: '' };
  editMode: boolean = false;

  constructor(
    private livroService: LivroService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      const livroId = Number(id);
      const livro = this.livroService.getLivros().find(f => f.idlivro === livroId);
      if (livro) {
        this.livro = { ...livro }; // Preenche os dados do livro no formulário
      }
    }
  }

  salvarLivro(): void {
    if (this.editMode) {
      this.livroService.editarLivro(this.livro.idlivro, this.livro);
    } else {
      const maxId = Math.max(...this.livroService.getLivros().map(l => l.idlivro), 0); // Pega o maior id
      this.livro.idlivro = maxId + 1; // Gera um novo ID
      this.livroService.addLivro(this.livro);
    }
    this.router.navigate(['/']); // Redireciona para a lista após o salvamento
  }
}
