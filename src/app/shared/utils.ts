import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2'
export class SwalUtils {
  public static showAlert(
    title: string,
    text: string,
    type: SweetAlertIcon
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      html: text,
      icon: type,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#689F38',
      showCancelButton: false,
    }).then();
  }
}
