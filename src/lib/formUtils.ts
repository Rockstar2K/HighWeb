interface FormProtectionOptions {
  maxSubmissionsPerDay?: number;
  requiredFields?: string[];
  honeypotField?: string;
}

export class FormProtection {
  private static instance: FormProtection;
  private options: Required<FormProtectionOptions>;

  private constructor(options: FormProtectionOptions = {}) {
    this.options = {
      maxSubmissionsPerDay: options.maxSubmissionsPerDay || 5,
      requiredFields: options.requiredFields || [],
      honeypotField: options.honeypotField || 'website',
    };
  }

  public static getInstance(options?: FormProtectionOptions): FormProtection {
    if (!FormProtection.instance) {
      FormProtection.instance = new FormProtection(options);
    }
    return FormProtection.instance;
  }

  /**
   * Checks if the current form submission is allowed based on daily limits
   */
  public checkDailySubmissions(formName: string = 'default'): { allowed: boolean; message?: string } {
    if (typeof window === 'undefined') {
      return { allowed: true };
    }

    const today = new Date().toISOString().slice(0, 10);
    const storageKey = `formSubmissions_${formName}`;
    const stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
    const count = stored[today] || 0;

    if (count >= this.options.maxSubmissionsPerDay) {
      return {
        allowed: false,
        message: `Has alcanzado el límite de ${this.options.maxSubmissionsPerDay} envíos por día. Por favor, inténtalo de nuevo mañana.`,
      };
    }

    return { allowed: true };
  }

  /**
   * Records a form submission in local storage
   */
  public recordSubmission(formName: string = 'default'): void {
    if (typeof window === 'undefined') return;

    const today = new Date().toISOString().slice(0, 10);
    const storageKey = `formSubmissions_${formName}`;
    const stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
    
    stored[today] = (stored[today] || 0) + 1;
    localStorage.setItem(storageKey, JSON.stringify(stored));
  }

  /**
   * Validates form fields
   */
  public validateForm(formData: FormData): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};
    
    // Check required fields
    this.options.requiredFields.forEach(field => {
      if (!formData.get(field)) {
        errors[field] = 'Este campo es obligatorio';
      }
    });

    // Check honeypot field
    if (this.options.honeypotField && formData.get(this.options.honeypotField)) {
      errors['honeypot'] = 'Spam detected';
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Resets the submission count for testing purposes
   */
  public resetSubmissions(formName: string = 'default'): void {
    if (typeof window === 'undefined') return;
    const storageKey = `formSubmissions_${formName}`;
    localStorage.removeItem(storageKey);
  }
}

// Default instance with default options
export const formProtection = FormProtection.getInstance();

// Helper function to create a form data object from an HTML form
export function getFormData(form: HTMLFormElement): FormData {
  return new FormData(form);
}

// Helper function to handle form submission with protection
export async function handleFormSubmit(
  form: HTMLFormElement, 
  options: {
    formName?: string;
    onSuccess?: (response: Response) => void;
    onError?: (error: Error) => void;
  } = {}
): Promise<{ success: boolean; message?: string }> {
  const formName = options.formName || 'default';
  const protection = FormProtection.getInstance();
  
  // Check daily submissions
  const submissionCheck = protection.checkDailySubmissions(formName);
  if (!submissionCheck.allowed) {
    return { success: false, message: submissionCheck.message };
  }

  // Validate form
  const formData = getFormData(form);
  const { valid, errors } = protection.validateForm(formData);
  
  if (!valid) {
    return { 
      success: false, 
      message: 'Por favor completa todos los campos requeridos correctamente.' 
    };
  }

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Only record submission on success
      protection.recordSubmission(formName);
      options.onSuccess?.(response);
      return { 
        success: true, 
        message: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.' 
      };
    } else {
      throw new Error('Error al enviar el formulario');
    }
  } catch (error) {
    options.onError?.(error as Error);
    return { 
      success: false, 
      message: 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.' 
    };
  }
}
