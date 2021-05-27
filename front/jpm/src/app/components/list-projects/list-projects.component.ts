import { Component, OnInit } from '@angular/core';
import { ProjectService } from "src/app/services/project.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

var risk_factor = 0;
var valor_projeto_total = 0;
@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})

export class ListProjectsComponent implements OnInit {
  investForm: FormGroup;
  projects: any[] = [];
  r: string = "";

  constructor(private _projectService: ProjectService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService) {
    this.investForm = this.fb.group({
      invest: ['', Validators.required],
      result: ['']
    })
  }

  ngOnInit(): void {
    this.getProjects()
  }

  getProjects() {
    this._projectService.getProjects().subscribe(data => {
      this.projects = [];

      data.forEach((element: any) => {
        this.r = element.risco_projeto;

        this.projects.push({
          id: element.id,
          data_fim: element.data_fim,
          data_inicio: element.data_inicio,
          nome_projeto: element.nome_projeto,
          participantes: element.participantes,
          risco_projeto: element.risco_projeto,
          valor_projeto: element.valor_projeto

        })
      });
    });
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  deleteProject(id: any, name: string) {
    if (confirm("Are you sure to delete " + name)) {
      this._projectService.deleteProject(id).subscribe(() => {
        this.toastr.error('Project successfully deleted!!', 'Project deleted!!')
        setTimeout(() => {
          window.location.reload();
        },
          1500)
      });
    }
  }

  calculateInvest() {
    var calc_factor = 0;
    var invest_value = this.investForm.value.invest
    var result = 0;
    if (valor_projeto_total > invest_value) {
      return alert("Insira um valor maior que o valor total do projeto!")
    }
    if (risk_factor == 0) {
      calc_factor = 0.05;
    } else if (risk_factor == 1) {
      calc_factor = 0.1;
    } else if (risk_factor == 2) {
      calc_factor = 0.2;
    }
    result = invest_value * calc_factor



    this.investForm.get('result')?.setValue(String(result))
    result = 0;


  }

  getRiskFactor(risco: any, projeto_valor: any) {
    risk_factor = risco
    valor_projeto_total = projeto_valor
  }
}