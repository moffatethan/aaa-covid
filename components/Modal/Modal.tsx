import { SetStateAction, Dispatch, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTransition, animated } from 'react-spring';

type ModalProps = {
  isRendered: boolean;
  setIsRendered: Dispatch<SetStateAction<boolean>>;
};
const Modal = ({ isRendered, setIsRendered }: ModalProps) => {
  const backgroundTransitions = useTransition(isRendered, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 300,
  });

  return backgroundTransitions((styles, item) =>
    item && isRendered ? (
      <animated.div
        style={styles}
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-xl font-sans font-medium mb-3">Please read before proceeding</h3>
                  <div className="flex gap-4 mb-3">
                    <div className="w-1 bg-blue-500"></div>
                    <p className="font-body flex-1 leading-loose">
                      Making a false or misleading statement or representation may lead to grave health implications and
                      will therefore be treated seriously by AAA Field Services, and disciplinary action may result, up
                      to an including termination of employment for Just Cause or, as applicable, contract termination
                      With Cause.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1 bg-blue-500"></div>
                    <p className="font-body flex-1 leading-loose">
                      By completing and submitting this form, you agree that the protection of health and safety is a
                      reasonable and pressing business objective and that you consent to the collection, use and
                      disclosure of personal information provided herein by AAA Field Services, as stated above. You
                      further represent and warrant that the information provided is true and accurate at the time of
                      submission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => setIsRendered(false)}
                className="font-body w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors">
                I will answer truthfully
              </button>
            </div>
          </div>
        </div>
      </animated.div>
    ) : null,
  );
};

export const ModalPortal = () => {
  const [isBrowser, setIsBrowser] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    let parent = document.getElementById('modal-root');
    if (!parent) {
      parent = document.body.appendChild(document.createElement('div'));
      parent.id = 'modal-root';
    }

    return createPortal(<Modal isRendered={open} setIsRendered={setOpen} />, parent);
  }

  return null;
};
