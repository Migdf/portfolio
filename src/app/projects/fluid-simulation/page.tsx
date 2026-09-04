import ProjectPage from "../../components/ProjectPage";

export default function FluidSimulationPage() {
  return (
    <ProjectPage
      title="Fluid Dynamics Simulation"
      subtitle="Implementing a two-dimensional lattice Boltzmann fluid simulation with collision, streaming, boundary conditions, and obstacle interactions."
      image="/images/fluid-simulation.png"
      video="/videos/fluid-simulation.mp4"

      technologies={[
        "Python",
        "NumPy",
        "Matplotlib",
        "Scientific Computing",
        "Fluid Dynamics",
      ]}

      links={[
        {
          label: "Open Colab Notebook",
          href: "https://colab.research.google.com/drive/1PsRa8Azct67aF57w0KqVkDWdk_G6H43R",
        },
      ]}

      sections={[
        {
          title: "The Problem",
          blocks: [
            {
              type: "text",
              content:
                "Fluid flow is usually described using continuous quantities such as density and velocity: how much fluid is present at each location and which direction it is moving. Directly solving the full equations of fluid dynamics can be mathematically and computationally difficult.\n\nThis project uses the lattice Boltzmann method, which approaches the problem differently. Instead of directly calculating the motion of the fluid as a whole, it tracks simplified groups of particles moving in fixed directions across a grid. Their combined behavior produces the larger-scale motion that we recognize as fluid flow.\n\nThe simulation runs on a 520 × 180 grid, includes solid obstacles, evolves over thousands of time steps, and converts its internal particle representation into velocity fields that can be visualized as an animation.",
            },
          ],
        },

        {
          title: "Lattice Boltzmann Model",
          blocks: [
            {
              type: "text",
              content:
                "The simulation uses a model called D2Q9. The name describes its structure: D2 means the fluid moves in two spatial dimensions, x and y, while Q9 means nine possible particle-motion directions are stored at every location on the grid.\n\nA useful way to picture this is to imagine nine small counters at every grid cell. One represents particles that are not moving, four represent motion to the right, left, up, and down, and the remaining four represent diagonal motion.\n\nThese values do not represent individual real molecules. Instead, each one describes how much fluid is currently moving in a particular direction. These are called microscopic particle populations and are written as nₖ, where the subscript k identifies one of the nine directions.",
            },
          ],
        },

        {
          title: "From Microscopic to Macroscopic",
          blocks: [
            {
              type: "text",
              content:
                "Internally, the simulation stores nine directional populations at every grid cell. Those microscopic values are useful for evolving the simulation, but when thinking about fluid behavior we usually care about macroscopic quantities such as density and velocity.\n\nDensity is written as ρ, the Greek letter rho, and represents how much fluid is present at a particular grid location.",
            },

            {
              type: "equation",
              equation: String.raw`
                \rho(i,j)
                =
                \sum_{k=0}^{8}
                n_k(i,j)
              `,
              caption:
                "Fluid density is the sum of the nine directional populations at one grid location.",
            },

            {
              type: "text",
              content:
                "Here, i and j identify a location on the two-dimensional grid, nₖ(i, j) is the amount of fluid moving in direction k at that location, and the summation means to add the values for all nine directions. If those nine populations add up to 1.0, for example, then the density at that grid cell is 1.0.",
            },

            {
              type: "text",
              content:
                "Velocity describes both how quickly the fluid is moving and in which direction. In two dimensions it has a horizontal component uₓ and a vertical component uᵧ.",
            },

            {
              type: "equation",
              equation: String.raw`
                u_x(i,j)
                =
                \frac{1}{\rho(i,j)}
                \sum_{k=0}^{8}
                v_{k,x}\,n_k(i,j)
              `,
              caption:
                "Horizontal fluid velocity calculated from the directional particle populations.",
            },

            {
              type: "text",
              content:
                "The value vₖ,ₓ is the horizontal part of direction k. A right-moving population has a positive horizontal direction, a left-moving population has a negative one, and a population moving straight up or down has a horizontal component of zero.\n\nEach population is multiplied by its direction, the contributions are added together, and the result is divided by the density. This gives the average horizontal velocity of the fluid at that location.",
            },

            {
              type: "equation",
              equation: String.raw`
                u_y(i,j)
                =
                \frac{1}{\rho(i,j)}
                \sum_{k=0}^{8}
                v_{k,y}\,n_k(i,j)
              `,
              caption:
                "Vertical fluid velocity calculated from the directional particle populations.",
            },

            {
              type: "text",
              content:
                "The vertical component follows the same idea, except vₖ,ᵧ is the vertical part of direction k. Together, uₓ and uᵧ describe the full fluid velocity at each point in the grid.",
            },
          ],
        },

        {
          title: "Equilibrium Distribution",
          blocks: [
            {
              type: "text",
              content:
                "The next step is determining how the particle populations should change when they interact. The lattice Boltzmann method handles this by defining a local equilibrium state.\n\nEquilibrium does not mean that the fluid stops moving. Instead, it describes the ideal distribution of the nine directional populations for the density and velocity currently present at a grid cell.",
            },

            {
              type: "equation",
              equation: String.raw`
                n_k^{\mathrm{eq}}
                =
                w_k \rho
                \left[
                  1
                  + 3(\mathbf{v}_k \cdot \mathbf{u})
                  + \frac{9}{2}
                    (\mathbf{v}_k \cdot \mathbf{u})^2
                  - \frac{3}{2}
                    (\mathbf{u} \cdot \mathbf{u})
                \right]
              `,
              caption:
                "D2Q9 equilibrium distribution used to determine the preferred population in each direction.",
            },

            {
              type: "text",
              content:
                "Here, nₖᵉᵠ is the equilibrium amount of fluid that should be moving in direction k, ρ is the local density, u is the local fluid velocity, and vₖ is the fixed velocity associated with direction k. For example, a right-moving direction can be represented as (1, 0), while an upward direction can be represented as (0, 1).",
            },

            {
              type: "text",
              content:
                "The dot product vₖ · u measures how closely direction k lines up with the current direction of the fluid. If the fluid is moving strongly to the right, the right-moving equilibrium population should become larger than the left-moving population. The term u · u = uₓ² + uᵧ² represents the square of the overall fluid speed.",
            },

            {
              type: "text",
              content:
                "The remaining value wₖ is a weight assigned to each D2Q9 direction. The stationary population uses 4/9, the four horizontal and vertical directions use 1/9 each, and the diagonal directions use 1/36 each.\n\nIn practical terms, the equilibrium equation answers one question: given the density and velocity at this grid cell, how much fluid should ideally be moving in each of the nine possible directions?",
            },
          ],
        },

        {
          title: "Collision",
          blocks: [
            {
              type: "text",
              content:
                "Once the current populations and their equilibrium values are known, the collision step moves each directional population toward equilibrium. This is a simplified way to represent particle interactions without explicitly simulating individual molecules colliding.",
            },

            {
              type: "equation",
              equation: String.raw`
                n_k^{\mathrm{new}}
                =
                (1-\omega)n_k^{\mathrm{current}}
                +
                \omega n_k^{\mathrm{eq}}
              `,
              caption:
                "Collision update that relaxes each population toward its equilibrium value.",
            },

            {
              type: "text",
              content:
                "Here, nₖ(current) is the amount of fluid currently moving in direction k, nₖᵉᵠ is its equilibrium value, and nₖ(new) is the population after the collision step. The parameter ω, pronounced omega, controls how strongly the current value moves toward equilibrium during one update. The simulation uses ω ≈ 1.9573.",
            },

            {
              type: "text",
              content:
                "Conceptually, the equation can be thought of as taking the current value and applying a correction toward equilibrium. If the population is already at equilibrium, very little needs to change. This update is applied independently at every fluid cell and for all nine directions, while solid obstacle cells are excluded from the normal collision calculation.",
            },
          ],
        },

        {
          title: "Streaming",
          blocks: [
            {
              type: "text",
              content:
                "Collision changes how much fluid belongs to each direction, but it does not move that fluid through the grid. Movement happens during a separate step called streaming.\n\nEach directional population shifts one grid cell according to its assigned velocity. A right-moving population moves one cell to the right, an upward-moving population moves one cell upward, and a diagonal population moves in both dimensions.",
            },

            {
              type: "text",
              content:
                "NumPy array shifts make this operation efficient because an entire directional population can be moved at once rather than updating every grid cell individually. The array operation wraps values across the grid boundaries, while the obstacle and boundary logic determines how the fluid behaves around solid regions.",
            },
          ],
        },

        {
          title: "Boundary Conditions & Obstacles",
          blocks: [
            {
              type: "text",
              content:
                "Without special handling, streaming would allow particle populations to move directly through solid obstacles. To represent a solid surface, the simulation uses a bounce-back boundary condition.\n\nThe idea is straightforward: a population that reaches a solid cell is reflected into the opposite direction. Right-moving populations become left-moving, upward populations become downward-moving, and each diagonal direction is exchanged with its opposite.",
            },

            {
              type: "text",
              content:
                "This reflection changes the momentum of the nearby fluid and approximates the interaction between fluid and a solid surface.\n\nTwo obstacle geometries were tested: a circular obstacle in the middle of the domain and a configuration containing two vertical wall segments. The animation at the top of the page shows the wall configuration. Because the fluid algorithm is separate from the geometry, changing the obstacle only requires changing which grid cells are marked as solid.",
            },
          ],
        },

        {
          title: "Initial Conditions",
          blocks: [
            {
              type: "text",
              content:
                "Every simulation needs a starting state. The fluid begins with a density of approximately 1.0 throughout the domain and a horizontal velocity of approximately 0.04, giving the flow an initial motion primarily across the grid.",
            },

            {
              type: "text",
              content:
                "A very small sinusoidal perturbation is added to the velocity. This is simply a slight wave-shaped variation, so not every row begins with exactly the same value. The small asymmetry gives the evolving flow something to develop from as it interacts with the obstacles.",
            },

            {
              type: "text",
              content:
                "Because the lattice Boltzmann model stores directional particle populations rather than density and velocity directly, the desired initial macroscopic values are passed through the equilibrium equation to generate the nine starting populations at every grid cell.",
            },
          ],
        },

        {
          title: "Simulation Loop",
          blocks: [
            {
              type: "text",
              content:
                "After initialization, each simulation time step repeats the same three operations: apply the obstacle boundary conditions, perform the collision update, and stream the directional populations into neighboring grid cells.\n\nThe collision stage also requires converting the microscopic populations back into density and velocity and calculating the corresponding equilibrium state. Repeating this loop thousands of times produces the evolving fluid flow.",
            },

            {
              type: "text",
              content:
                "At selected time steps, the horizontal and vertical velocity components are combined into a single velocity magnitude:",
            },

            {
              type: "equation",
              equation: String.raw`
                |\mathbf{u}|
                =
                \sqrt{u_x^2 + u_y^2}
              `,
              caption:
                "Overall fluid speed calculated from the horizontal and vertical velocity components.",
            },

            {
              type: "text",
              content:
                "The vertical bars around u mean magnitude, or overall speed. Squaring uₓ and uᵧ, adding them together, and taking the square root gives one positive value describing how quickly the fluid is moving regardless of direction. This is the quantity displayed in the animation.",
            },
          ],
        },

        {
          title: "Challenges & Decisions",
          blocks: [
            {
              type: "text",
              content:
                "One of the main challenges was keeping the different numerical representations consistent. The microscopic simulation stores nine values at every one of the 520 × 180 grid locations, resulting in more than 840,000 population values. By comparison, the density field contains one value at each location and the velocity field contains two.",
            },

            {
              type: "text",
              content:
                "Moving between these representations required careful control of array dimensions. A formula could be correct mathematically but still fail computationally if the nine particle directions, two velocity components, and two spatial dimensions were not aligned correctly.",
            },

            {
              type: "text",
              content:
                "The order of the simulation steps was also important. Collision, bounce-back, and streaming represent different processes, so reversing the wrong directional populations or applying an operation at the wrong stage could produce visibly incorrect flow.",
            },

            {
              type: "text",
              content:
                "Performance mattered as well because every time step updates hundreds of thousands of values and the process is repeated thousands of times. Vectorized NumPy operations were therefore used wherever practical instead of deeply nested Python loops over every x-position, y-position, and particle direction.",
            },
          ],
        },

        {
          title: "Results",
          blocks: [
            {
              type: "text",
              content:
                "The completed simulation produced a time-dependent two-dimensional velocity field. The flow begins primarily in the horizontal direction and changes as it encounters solid geometry.\n\nNear an obstacle, the bounce-back rule redirects the directional populations. Those local changes then propagate through later collision and streaming steps, producing larger-scale structure in the velocity field that is visible in the animation.",
            },

            {
              type: "text",
              content:
                "The same underlying fluid model worked with both a circular obstacle and a two-wall configuration, showing that the numerical simulation was reusable across different geometries rather than being tied to one specific obstacle shape.",
            },
          ],
        },

        {
          title: "Visualization",
          blocks: [
            {
              type: "text",
              content:
                "Matplotlib was used to visualize the magnitude of the velocity field. Each location in the image corresponds to one grid cell, and its displayed value represents the local fluid speed |u|.",
            },

            {
              type: "text",
              content:
                "Velocity fields recorded at different simulation times were combined into an animation, making it possible to observe how the flow develops rather than comparing only the starting and ending states.\n\nThe animation also served as a useful debugging tool. Errors in streaming, obstacle handling, or directional populations often produce visible discontinuities or unexpected patterns, so watching the system evolve provided another way to judge whether the numerical behavior was sensible.",
            },
          ],
        },

        {
          title: "What I Learned",
          blocks: [
            {
              type: "text",
              content:
                "Before this project, I mostly thought about fluid simulation in terms of directly solving equations for quantities such as velocity and pressure. The lattice Boltzmann method introduced a different perspective: evolve simpler microscopic quantities and recover the macroscopic fluid behavior from their collective motion.",
            },

            {
              type: "text",
              content:
                "The project also made the connection between mathematical notation and numerical implementation much more concrete. Symbols such as ρ, u, vₖ, and nₖ are compact on paper, but translating them into code requires understanding exactly what each array stores, how its dimensions are organized, and how the quantities interact.",
            },

            {
              type: "text",
              content:
                "A larger takeaway was that a working numerical simulation depends on the consistency of many smaller pieces. The equilibrium equation alone does not create realistic flow; the microscopic-to-macroscopic conversion, collision rule, streaming step, initial conditions, boundaries, and visualization all have to work together.\n\nBuilding those components into one system strengthened my understanding of both numerical modeling and fluid dynamics while giving me more experience translating mathematical models into efficient computational implementations.",
            },
          ],
        },
      ]}
    />
  );
}