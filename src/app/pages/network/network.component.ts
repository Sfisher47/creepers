import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as vis  from 'vis-network';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {

  data: any[];
  network: any[] = [];


  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data['data'];
    this.initNetwork2();
  }


  processData(edges: any[]) {
    if(!this.data) return;

    const contactNodes: any[] = [];
    const usersNodes: any[] = []; 

    this.data.forEach((item, index, array) => {

        let contact = contactNodes.find( (n) => {
            return n.label === item.telephone;
        });

        let user = usersNodes.find( (n) => {
            return n.label === item.user.name;
        });

        if(!contact) {
            contact = {
                id: index,
                label: item.telephone,
                shape: 'icon',
                icon: {
                    face: "'Font Awesome 5 Pro'",
                    weight: "bold",
                    code: '\uf095',
                    size: 50,
                    color: '#555'
                }
            };
            contactNodes.push(contact);
        }

        if(!user) {
            user = {
                id: array.length + index,
                label: item.user.name,
                shape: 'icon',
                icon: {
                    face: "'Font Awesome 5 Pro'",
                    weight: "bold",
                    code: '\uf007',
                    size: 50,
                    color: '#555'
                }
            };
            usersNodes.push(user);
        }

        edges.push({
            from: contact.id,
            to: user.id
        });
    })

    return [...contactNodes, ...usersNodes];
  }

  initNetwork2() {
    
    var edges = [];     
    var nodes = this.processData(edges);

    // create a network
    var container = document.getElementById('network');
    var data = {
      nodes: nodes,
      edges: edges
    };

    var options = {
      height: '100%',
      width: '100%'
    };

    var network = new vis.Network(container, data, options);

    container.click();
  }

}
