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
            return n.ref === item.telephone;
        });

        let user = usersNodes.find( (n) => {
            return n.ref === item.user.id;
        });

        if(!contact) {
            contact = {
                id: index,
                ref: item.telephone,
                names: [item.name],
                label: `<${item.name}>\n${item.telephone}`,
                shape: 'circularImage',                
                physics: false,
                image: {
                  selected: item.photo_url,
                  unselected: item.photo_url
                },
            };
            contactNodes.push(contact);
        }
        else {
          contact.names.push(item.name);
          contact.label = contact.names.map(x => '<'+ x +'>').join(' | ') + '\n' + contact.ref;
        }

        if(!user) {
            user = {
                id: array.length + index,
                ref: item.user.id,
                label: `\n<${item.user.name}>\n${item.user.telephone}`,
                shape: 'icon',
                physics: false,
                icon: {
                    face: "'Font Awesome 5 Pro'",
                    weight: "bold",
                    code: '\uf007',
                    size: 30,
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
    container.style.height = `${window.innerHeight - 123}px`;

    var data = {
      nodes: nodes,
      edges: edges
    };

    var options = {
      height: '100%',
      width: '100%',
    };

    var network = new vis.Network(container, data, options);

    container.click();
  }

}
