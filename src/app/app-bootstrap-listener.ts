import { Store } from '@ngxs/store';
import { AddingNote } from '@app/store/adding-note.state';
import { PageService } from '@app/services/page.service';

export function appBootstrapListener(
  store: Store,
  pageService: PageService,
): () => void {

  function listenToDeactivateAddingNote() {
    document.addEventListener('mousedown', (event) => {
      const isKonvaContent = document.elementsFromPoint(event.clientX, event.clientY)
        .some(element => element.classList.contains('konvajs-content'));

      if (!isKonvaContent) {
        store.dispatch(new AddingNote.Deactivate());
      }
    });
  }

  function listenToDeleteNote() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 46) {
        pageService.delete();
      }
    });
  }

  return () => {
    listenToDeactivateAddingNote();
    listenToDeleteNote();
  };
}
