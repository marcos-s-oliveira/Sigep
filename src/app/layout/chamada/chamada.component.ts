import { ChamadasService } from './../../services/chamadas.service';
import { AlunosService } from './../../services/alunos.service';
import { DisciplinasService } from './../../services/disciplinas.service';
import { AulasService } from './../../services/aulas.service';
import { TurmasService } from './../../services/turmas.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-chamada',
  templateUrl: './chamada.component.html',
  styleUrls: ['./chamada.component.css']
})


export class ChamadaComponent implements OnInit {

  constructor(
    private turmasService: TurmasService,
    private aulasService: AulasService,
    private disciplinasService: DisciplinasService,
    private alunosService: AlunosService,
    private chamadasService: ChamadasService,
    private router: Router
  ) { 
    
     }
  turma = ''
  selTurma = ''
  aula = []
  selAula = ''
  turmaDisabled = false
  aulaDisabled = true
  submitDisabled = true

  turmas: Array<any> = new Array()

  aulas: Array<any> = new Array()
 
  disciplinas: Array<any> = new Array()

  alunos: Array<any> = new Array()

  presentes: Array<any> = []

  onChangeTurma(turma) {
    this.aulaDisabled = false
    this.selTurma = turma.id
    this.listaAulas()
    
  }


  ngOnInit() {
    this.listaTurmas()
  }

  listaTurmas() {
    this.turmasService.listarTurmas().subscribe(turmas => {
      this.turmas = turmas
    }, err => {
          console.log('Erro: ', err)
      })
  }

  listaAulas() {
    let professor = window.localStorage.getItem('professorId')
    this.aulasService.listarAulas(this.selTurma, professor).subscribe(aulas => {
      
      for (let index of aulas) {
        this.getDisciplina(index.disciplinasId)
      }
    }, err => {
        console.log('Erro', err)
    })
  }

  getDisciplina(id) {
    this.disciplinasService.getDisciplina(id).subscribe(disciplinas => {
      this.aulas.push(disciplinas)
    }, err => {
        console.log('Erro: ', err)
    })
  }
  onChangeAula( aula ) {
    this.selAula = aula.id
    this.chamadaStart()
  }

  chamadaStart() {
    this.alunosService.listaAlunosChamada(this.selTurma).subscribe(alunos => {
      this.submitDisabled = false
      for (let index of alunos) {
        this.alunos.push(index)
      }
    }, err => {
      console.log('Erro: ', err)
  })
  }
  registraPresenca(aluno) {
    this.turmaDisabled = true
    this.aulaDisabled = true
    let professor = window.localStorage.getItem('professorId')
    this.presentes.push({aluno: aluno.id, prof: professor, date: Date(), aula: this.selAula})
  }
  onSubmit() {
    this.chamadasService.salvarChamada(this.presentes).subscribe(presentes => {
    this.router.navigate(['/'])
    }, err => {
      console.log('Erro: ', err)
  })
  }
}
