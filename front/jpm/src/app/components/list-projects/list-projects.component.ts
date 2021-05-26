import { Component, OnInit } from '@angular/core';
import { ProjectService } from "src/app/services/project.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})




  export class ListProjectsComponent implements OnInit {
    projects: any[] = [];
    r: string = "";
    
    constructor(private _projectService: ProjectService,
              private router:Router,
              private toastr: ToastrService) { }
  
    ngOnInit(): void {
      this.getProjects()
    }
  
    getProjects(){
      this._projectService.getProjects().subscribe(data => {
        this.projects = [];
        
        data.forEach((element:any) => {
          this.r = element.risco_projeto;
          
          this.projects.push({
            id: element.id,
            data_fim:element.data_fim,
            data_inicio:element.data_inicio,
            nome_projeto:element.nome_projeto,
            participantes:element.participantes,
            risco_projeto:element.risco_projeto,
            valor_projeto:element.valor_projeto
            
          })
        });
        console.log(data);
        console.log(this.projects);
      });
    }
    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }
    deleteProject(id:any, name:string){
      if(confirm("Are you sure to delete "+name)) {
        this._projectService.deleteProject(id).subscribe(() => {
          this.toastr.error('Project successfully deleted!!','Project deleted!!')
          setTimeout(() => {
            window.location.reload();
          },
            1500)
        });
      }
      else{
        this.toastr.error('Some error has ocurred','Try again Later')
      }
      
    }
}
