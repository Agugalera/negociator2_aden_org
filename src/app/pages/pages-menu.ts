import { NbMenuItem } from "@nebular/theme";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { ROLES } from "../@auth/roles";

@Injectable()
export class PagesMenu {
  getMenu(role?): Observable<NbMenuItem[]> {
    const studentMenu = [
      {
        title: "Etapas",
        icon: "book-outline",
        group: true,
      },
      {
        title: "Información",
        icon: "alert-circle-outline",
        link: "/pages/dashboard-student/information",
      },
      {
        title: "Pre Negociación",
        icon: "book-open-outline",
        link: "/pages/dashboard-student/pre",
      },
      {
        title: "Negociación",
        icon: "book-outline",
        link: "/pages/dashboard-student/negociation",
      },
      {
        title: "Finalizado",
        icon: "checkmark-circle-outline",
        link: "/pages/dashboard-student/finished",
      },
      {
        title: "Sala de reuniones",
        icon: "calendar-outline",
        link: "/pages/meeting-room",
      },
    ];

    const teacherMenu = [
      {
        title: "Principal",
        icon: "home-outline",
        link: "/pages/dashboard",
        home: true,
        children: undefined,
      },
    ];

    const adminMenu = [
      {
        title: "Principal",
        icon: "home-outline",
        link: "/pages/dashboard",
        home: true,
        children: undefined,
      },

      {
        title: "Empresas",
        icon: "book-outline",
        expanded: true,
        children: [
          {
            title: "Arbotic Inc.",
            link: "/pages/companies/create/1",
          },
          {
            title: "Byntech Inc.",
            link: "/pages/companies/create/2",
          },
        ],
      },
      {
        title: "Variables/Negociación",
        icon: "settings-outline",
        link: "/pages/variables",
        home: true,
        children: undefined,
      },
      {
        title: "Siete elementos",
        icon: "bookmark-outline",
        link: "/pages/variables/seven",
        home: true,
        children: undefined,
      },
      {
        title: "Usuarios",
        icon: "people-outline",
        link: "/pages/users/list",
        home: true,
        children: undefined,
      },
      // {
      //   title: 'Negociación',
      //   icon: 'pricetags-outline',
      //   link: '/pages/variables/negotiation',
      //   home: true,
      //   children: undefined,
      // }
    ];

    if (Number(role) === ROLES.ADMIN) {
      return of([...adminMenu]);
    } else if (Number(role) === ROLES.TEACHER) {
      return of([...teacherMenu]);
    } else if (Number(role) === ROLES.GUEST) {
      return of([...studentMenu]);
    } else {
      return of([]);
    }

    // return of([...dashboardMenu, ...studentMenu]);
  }
}
