import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { TieredMenuModule } from "primeng/tieredmenu";
import { TreeModule } from "primeng/tree";
import { ContextMenuModule } from "primeng/contextmenu";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputTextModule } from "primeng/inputtext";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { ToastModule } from "primeng/toast";
import { CardModule } from "primeng/card";
import { PasswordModule } from "primeng/password";
import { TooltipModule } from "primeng/tooltip";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { TabViewModule } from "primeng/tabview";
import { TableModule } from "primeng/table";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { GMapModule } from "primeng/gmap";
import { PanelModule } from "primeng/panel";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputTextareaModule } from "primeng/inputtextarea";

export const primengComponents = [
  ButtonModule,
  RadioButtonModule,
  TieredMenuModule,
  InputTextareaModule,
  TreeModule,
  ContextMenuModule,
  DialogModule,
  ConfirmDialogModule,
  InputTextModule,
  DynamicDialogModule,
  ToastModule,
  CardModule,
  PasswordModule,
  TooltipModule,
  OverlayPanelModule,
  TabViewModule,
  TableModule,
  CalendarModule,
  DropdownModule,
  GMapModule,
  PanelModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [primengComponents],
})
export class PrimengModule {}
