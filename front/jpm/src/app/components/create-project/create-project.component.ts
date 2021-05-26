import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  id: string | null;
  createProject: FormGroup;
  submitted = false;
  validateDate = false;
  titulo = 'Adicionar Projeto';

  constructor(private fb: FormBuilder,
    private _projectService: ProjectService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.createProject = this.fb.group({
      nome_projeto: ['', Validators.required],
      data_inicio: ['', Validators.required],
      data_fim: ['', Validators.required],
      valor_projeto: ['', Validators.required],
      risco_projeto: ['', Validators.required],
      participantes: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEdit()
  }
  
  addModifyProject() {
    this.submitted = true;
    alert(this.createProject)
    if (this.createProject.invalid) {
      return;
    }
    
    if(this.id === null){
      this.addProject()

    }
    else{
      this.modifyProject(this.id)
    }
  }


  addProject() {
    this.submitted = true;
    if (this.createProject.invalid) {
      return;
    }
    console.log(this.createProject);

    const project: any = {
      data_fim: this.createProject.value.data_fim,
      data_inicio: this.createProject.value.data_inicio,
      nome_projeto: this.createProject.value.nome_projeto,
      participantes: this.createProject.value.participantes,
      risco_projeto: this.createProject.value.risco_projeto,
      valor_projeto: this.createProject.value.valor_projeto
    }
    if (project.data_inicio > project.data_fim) {
      this.validateDate = true;
      return;
    }
    else this.validateDate = false;

    this._projectService.createProject(project).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        this.toastr.success('Project successfully added!!', 'Project created!!')
        this.router.navigate(['/list-projects'])
      },
      error => {
        console.log(error);
      });
  }

  isEdit() {
    if (this.id !== null) {
      this.titulo = 'Editar Projeto';
 
      console.log("opa");
      this._projectService.getProject(this.id).subscribe(data => {
        
        this.createProject.get('nome_projeto')?.setValue(data.nome_projeto)
        this.createProject.get('data_inicio')?.setValue(data.data_inicio)
        this.createProject.get('data_fim')?.setValue(data.data_fim)
        this.createProject.get('valor_projeto')?.setValue(data.valor_projeto)
        this.createProject.get('risco_projeto')?.setValue(data.risco_projeto)
        this.createProject.get('participantes')?.setValue(data.participantes)
               
      },
        error => {
          console.log(error);
        });
    }
  }

  modifyProject(id:any) {
    const project: any = {
      data_fim: this.createProject.value.data_fim,
      data_inicio: this.createProject.value.data_inicio,
      nome_projeto: this.createProject.value.nome_projeto,
      participantes: this.createProject.value.participantes,
      risco_projeto: this.createProject.value.risco_projeto,
      valor_projeto: this.createProject.value.valor_projeto
    }
    
    this._projectService.modifyProject(id,project).subscribe(
      response => {
        console.log(response);
        this.submitted = true;
        this.toastr.success('Project successfully modified!!', 'Project modified!!')
        this.router.navigate(['/list-projects'])
      },
      error => {
        console.log(error);
      });
  }

}

