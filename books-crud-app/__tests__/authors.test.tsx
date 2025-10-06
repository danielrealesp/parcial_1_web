import { render, screen, waitFor } from "@testing-library/react";
import { DataProvider } from "@/context/DataContext";
import Authors from "@/app/authors/page";
import { Author } from "@/lib/types";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

const mockAuthors: Author[] = [
  {
    id: 1,
    name: "Gabriel García Márquez",
    birthDate: "1927-03-06",
    description: "Colombian novelist and Nobel Prize winner",
    image: "https://example.com/ggm.jpg",
    books: [
      {
        id: 101,
        name: "Cien años de soledad",
        isbn: "978-0307474728",
        image: "https://example.com/cien.jpg",
        publishingDate: "1967-05-30",
        description: "A masterpiece of magical realism",
        editorial: { id: 1, name: "Editorial Sudamericana" },
      },
    ],
    prizes: [],
    readingProgress: 0,
  },
  {
    id: 2,
    name: "Isabel Allende",
    birthDate: "1942-08-02",
    description: "Chilean-American writer",
    image: "https://example.com/cien.jpg",
    books: [],
    prizes: [],
    readingProgress: 50,
  },
  {
    id: 3,
    name: "Jorge Luis Borges",
    birthDate: "1899-08-24",
    description: "Argentine short-story writer, essayist, and poet",
    image: "https://example.com/jlb.jpg",
    books: [],
    prizes: [],
    readingProgress: 100,
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => mockAuthors,
  }),
) as jest.Mock;

const renderWithProvider = () => {
  return render(
    <DataProvider>
      <Authors />
    </DataProvider>,
  );
};

describe("Authors - Prueba de Lectura de Progresso de Autores", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test 1: Renderiza la lista de autores. Simula cambiar el progreso de uno de ellos.
   * Verifica que se actualice el porcentaje mostrado y que el estado textual cambie
   * según la nueva lectura (p. ej., de "Sin iniciar" a "En curso").
   */
  test("debe cambiar el progreso de lectura de un autor", async () => {
    const { fireEvent } = await import("@testing-library/react");
    renderWithProvider();

    // Wait for authors to load
    await waitFor(() => {
      expect(screen.getByText("Gabriel García Márquez")).toBeInTheDocument();
    });

    // Find the first author's progress slider (Gabriel García Márquez with 0% progress)
    const sliders = screen.getAllByRole("slider");
    const firstAuthorSlider = sliders[0];

    // Verify initial slider value is 0
    expect(firstAuthorSlider).toHaveValue("0");

    // Verify "Sin iniciar" status is present initially
    const sinIniciarStatuses = screen.getAllByText("Sin iniciar");
    expect(sinIniciarStatuses.length).toBeGreaterThan(0);

    // Change the slider value from 0 to 45
    fireEvent.change(firstAuthorSlider, { target: { value: "45" } });

    // Verify the slider value is now 45
    await waitFor(() => {
      expect(firstAuthorSlider).toHaveValue("45");
    });

    // Verify the percentage is displayed as 45%
    await waitFor(() => {
      const percentageTexts = screen.getAllByText("45%");
      expect(percentageTexts.length).toBeGreaterThan(0);
    });

    // Verify the status text changed to "En curso"
    await waitFor(() => {
      const enCursoStatuses = screen.getAllByText("En curso");
      expect(enCursoStatuses.length).toBeGreaterThan(0);
    });

    // Change to 100% to verify "Completado" status
    fireEvent.change(firstAuthorSlider, { target: { value: "100" } });

    await waitFor(() => {
      expect(firstAuthorSlider).toHaveValue("100");
    });

    // Verify "Completado" status appears
    await waitFor(() => {
      const completadoStatuses = screen.getAllByText("Completado");
      expect(completadoStatuses.length).toBeGreaterThan(0);
    });
  });

  /**
   * Test 2: Cambia varios progresos y verifica que el resumen refleje correctamente:
   * El nuevo promedio general. El conteo de estados (sin iniciar, en curso, completados).
   */
  test("debe correctamente mostrar las estadisticas descriptivas del progreso de autores", async () => {
    const { fireEvent } = await import("@testing-library/react");
    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByText("Gabriel García Márquez")).toBeInTheDocument();
    });

    // Verify initial average is 50.0% ((0 + 50 + 100) / 3)
    await waitFor(() => {
      expect(screen.getByText("50.0%")).toBeInTheDocument();
      expect(screen.getByText("Promedio")).toBeInTheDocument();
    });

    // Get statistics container
    const promedioDiv = screen.getByText("Promedio").closest("div");
    const statsContainer = promedioDiv?.parentElement?.parentElement;

    // Verify initial counts: sinIniciar: 1, enCurso: 1, completado: 1
    const initialStats = statsContainer?.querySelectorAll(
      ".text-xl, .text-2xl",
    );
    // Index 0: 50.0% (average), 1: 1 (sin iniciar), 2: 1 (en curso), 3: 1 (completado)

    const sliders = screen.getAllByRole("slider");

    // Change first author (GGM) from 0% to 75%
    fireEvent.change(sliders[0], { target: { value: "75" } });

    // Change second author (IA) from 50% to 100%
    fireEvent.change(sliders[1], { target: { value: "100" } });

    // Keep third author (JLB) at 100%

    // New statistics should be:
    // Average: (75 + 100 + 100) / 3 = 91.67% (displayed as 91.7%)
    // Sin iniciar: 0, En curso: 1, Completado: 2

    await waitFor(() => {
      expect(screen.getByText("91.7%")).toBeInTheDocument();
    });

    // Verify counts by querying the statistics section
    const updatedStats = statsContainer?.querySelectorAll(
      ".text-xl, .text-2xl",
    );

    // Find the stat values by their associated labels
    const sinIniciarLabel = screen
      .getAllByText("Sin iniciar")
      .find((el) => el.className.includes("text-xs"));
    const sinIniciarValue =
      sinIniciarLabel?.previousElementSibling?.textContent;
    expect(sinIniciarValue).toBe("0");

    const enCursoLabel = screen
      .getAllByText("En curso")
      .find(
        (el) =>
          el.className.includes("text-xs") &&
          el.className.includes("text-gray-500"),
      );
    const enCursoValue = enCursoLabel?.previousElementSibling?.textContent;
    expect(enCursoValue).toBe("1");

    const completadoLabel = screen
      .getAllByText("Completado")
      .find(
        (el) =>
          el.className.includes("text-xs") &&
          el.className.includes("text-gray-500"),
      );
    const completadoValue =
      completadoLabel?.previousElementSibling?.textContent;
    expect(completadoValue).toBe("2");
  });
});
