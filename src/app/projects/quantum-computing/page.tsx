import ProjectPage from "../../components/ProjectPage";

export default function QuantumComputingPage() {
  return (
    <ProjectPage
      title="Quantum Computing Simulator & Shor’s Algorithm"
      subtitle="Building three quantum circuit simulators from scratch and extending the most practical design with quantum Fourier transforms, phase estimation, modular arithmetic, and Shor’s factoring algorithm."
      image="/images/quantum-computing.png"
      imageAttribution={{
        label:
          "Quantum Computing Vectors by Vecteezy",
        href:
          "https://www.vecteezy.com/free-vector/quantum-computing",
      }}
      technologies={[
        "Python",
        "NumPy",
        "Quantum Computing",
        "Linear Algebra",
        "Quantum Fourier Transform",
        "Shor's Algorithm",
      ]}
      links={[
        {
          label: "View Source Code",
          href:
            "https://github.com/Migdf/PHYS-446/tree/main/Quantum%20Computing",
        },
      ]}
      sections={[
        {
          title: "Project Overview",
          blocks: [
            {
              type: "text",
              content:
                "I built a quantum computing simulator from scratch in Python and NumPy to understand how quantum circuits operate below the level of a high-level quantum library.\n\nInstead of settling on one implementation, I developed three different simulators, S, M-A, and M-B, to compare different ways of representing and evolving a quantum state. I then extended the most practical design step by step until it could run the quantum portion of Shor’s algorithm.",
            },

            {
              type: "code",
              code: `Project progression

Quantum state simulation
        ↓
Basic gates and measurement
        ↓
Composite gate pre-compiler
        ↓
Quantum Fourier Transform
        ↓
Quantum Phase Estimation
        ↓
Modular multiplication
        ↓
Period finding
        ↓
Shor's Algorithm
        ↓
Integer factors`,
            },

            {
              type: "text",
              content:
                "Each stage built on the previous one. The simulator provided the engine for evolving quantum states, the Quantum Fourier Transform enabled phase estimation, phase estimation made period finding possible, and period finding is the key quantum step used by Shor’s algorithm.",
            },
          ],
        },

        {
          title: "Three Simulator Designs",
          blocks: [
            {
              type: "text",
              content:
                "I built three versions of the simulator to compare different ways of representing and evolving the same quantum state. Simulator S works directly with nonzero basis states, while M-A and M-B use full state vectors and gate matrices.",
            },

            {
              type: "code",
              code: `Same 2-qubit state:

|ψ⟩ = (1/√2)|00⟩ + (1/√2)|11⟩


SIMULATOR S
Sparse Dirac-style representation

[
  (0.707, "00"),
  (0.707, "11")
]

Only basis states with nonzero amplitudes are stored.


SIMULATORS M-A / M-B
Dense vector representation

┌       ┐
│ 0.707 │   ← |00⟩
│ 0     │   ← |01⟩
│ 0     │   ← |10⟩
│ 0.707 │   ← |11⟩
└       ┘

All 2ⁿ basis-state positions are represented.`,
            },

            {
              type: "text",
              content:
                "The important difference is not the quantum state itself. All three simulators represent the same physics. The difference is how that state is stored and how gates are applied to it.",
            },

            {
              type: "code",
              code: `SIMULATOR S

Sparse state
    ↓
Apply H / P / CNOT directly to basis states
    ↓
Combine duplicate basis states
    ↓
Updated sparse state


SIMULATOR M-A

State vector
    ↓
Build U₁
Build U₂
Build U₃
    ↓
Multiply matrices together

Utotal = U₃ U₂ U₁

    ↓
Apply Utotal once
    ↓
Final state vector


SIMULATOR M-B

State vector
    ↓
Build U₁ → apply to state
    ↓
Build U₂ → apply to state
    ↓
Build U₃ → apply to state
    ↓
Final state vector`,
            },

            {
              type: "text",
              content:
                "Simulator S directly transforms the stored basis states instead of creating full gate matrices. This made it flexible and especially useful when I later added custom modular multiplication operations for Shor's algorithm.",
            },

            {
              type: "text",
              content:
                "M-A follows the textbook matrix formulation most closely. Every gate becomes a 2ⁿ × 2ⁿ matrix, and those matrices are multiplied together into one complete circuit unitary before being applied to the initial state. This is conceptually clean, but matrix-to-matrix multiplication becomes expensive very quickly.",
            },

            {
              type: "equation",
              equation: String.raw`
                U_{\mathrm{total}}
                =
                U_m U_{m-1}\cdots U_2 U_1,
                \qquad
                |\psi_{\mathrm{final}}\rangle
                =
                U_{\mathrm{total}}
                |\psi_0\rangle
              `,
              caption:
                "M-A first builds the complete circuit matrix and then applies it once.",
            },

            {
              type: "text",
              content:
                "M-B still constructs a full matrix for each gate, but skips the large matrix-to-matrix multiplication. Each gate matrix is immediately applied to the current state vector before the next gate is processed. This made M-B substantially faster than M-A in my tests, although both still require exponentially growing matrices.",
            },

            {
              type: "equation",
              equation: String.raw`
                |\psi_1\rangle
                =
                U_1|\psi_0\rangle,
                \qquad
                |\psi_2\rangle
                =
                U_2|\psi_1\rangle,
                \qquad
                \ldots
              `,
              caption:
                "M-B updates the state after every gate rather than constructing one complete circuit matrix.",
            },

            {
              type: "image",
              image: {
                src:
                  "/images/quantum_computing_runtime.png",
                alt:
                  "Runtime comparison between quantum simulators S, M-A, and M-B as the number of qubits increases",
                caption:
                  "Runtime comparison of the three simulator designs on randomly generated 10-gate circuits.",
              },
            },

            {
              type: "text",
              content:
                "The runtime comparison made the tradeoff clear. I tested Simulator S from 2 to 20 qubits, while the two matrix-based simulators were limited to 2 through 12 qubits because their runtime increased much more rapidly. M-B improved significantly on M-A by avoiding repeated matrix-to-matrix multiplication, while S remained the most practical design for extending the project.",
            },

            {
              type: "code",
              code: `At a glance

S
State:    Sparse amplitude + bitstring pairs
Gates:    Directly modify stored states
Pros:     Flexible, avoids full gate matrices
Cons:     More gate logic must be implemented manually
Used for: Shor's algorithm


M-A
State:    Dense 2ⁿ state vector
Gates:    Full 2ⁿ × 2ⁿ matrices
Method:   Combine all gates into Utotal first
Pros:     Closest to textbook linear algebra
Cons:     Expensive matrix-to-matrix multiplication


M-B
State:    Dense 2ⁿ state vector
Gates:    Full 2ⁿ × 2ⁿ matrices
Method:   Apply each gate matrix immediately
Pros:     Faster than M-A
Cons:     Still requires exponentially large matrices`,
            },

            {
              type: "text",
              content:
                "I ultimately chose Simulator S for Shor's algorithm because it avoided full 2ⁿ × 2ⁿ gate matrices and could directly support the custom xy mod N and controlled xy mod N operations required for quantum period finding.",
            },
          ],
        },

        {
          title:
            "Measurement & Composite Gates",
          blocks: [
            {
              type: "text",
              content:
                "Once the simulator could evolve quantum states, I added the operations needed to build larger algorithms. Measurement converts the amplitudes of a quantum state into probabilities and samples one classical result from that distribution.",
            },

            {
              type: "equation",
              equation: String.raw`
                P(x)=|\alpha_x|^2
              `,
              caption:
                "Measurement probability is determined by the squared magnitude of a state's amplitude.",
            },

            {
              type: "text",
              content:
                "I also implemented higher-level operations including NOT, Rz, controlled-Rz, controlled-phase, and SWAP. Rather than adding separate low-level logic for every new gate, I built a pre-compiler that decomposes composite operations into the smaller gate set already supported by the simulator.\n\nThis became useful later because algorithms such as the Quantum Fourier Transform can be described using these higher-level operations while the simulator itself remains relatively simple.",
            },
          ],
        },

        {
          title:
            "Quantum Fourier Transform & Phase Estimation",
          blocks: [
            {
              type: "text",
              content:
                "The Quantum Fourier Transform, or QFT, is the quantum equivalent of a discrete Fourier transform. Instead of directly revealing a period, it transforms phase information stored across a quantum state into a form that can later be measured.",
            },

            {
              type: "text",
              content:
                "I generated QFT circuits from Hadamard gates, controlled-phase rotations, and SWAP operations. To verify the implementation, I compared a three-qubit generated circuit against the analytical QFT matrix and obtained a maximum numerical difference of approximately 1.5 × 10⁻¹⁵.",
            },

            {
              type: "equation",
              equation: String.raw`
                |j\rangle
                \rightarrow
                \frac{1}{\sqrt{2^n}}
                \sum_{k=0}^{2^n-1}
                e^{2\pi i jk/2^n}
                |k\rangle
              `,
              caption:
                "The Quantum Fourier Transform converts computational-basis information into phase-encoded amplitudes.",
            },

            {
              type: "text",
              content:
                "I then used the inverse QFT inside quantum phase estimation. Phase estimation works with a unitary operation U and a state whose phase is hidden in the eigenvalue of that operation. Controlled repetitions of U encode the phase into a separate register, and the inverse QFT converts that encoded phase into a binary value that can be measured.",
            },

            {
              type: "equation",
              equation: String.raw`
                U|\psi\rangle
                =
                e^{2\pi i\theta}
                |\psi\rangle
              `,
              caption:
                "Quantum phase estimation is designed to recover information about the phase θ.",
            },

            {
              type: "text",
              content:
                "This matters for Shor’s algorithm because the modular multiplication operation has phases related to the period we are trying to find. Phase estimation therefore provides the bridge between a repeating modular sequence and a measurable quantum result.",
            },
          ],
        },

        {
          title: "Shor’s Algorithm",
          blocks: [
            {
              type: "text",
              content:
                "Shor’s algorithm is a quantum algorithm for finding the prime factors of a composite integer. For example, given N = 33, the goal is to recover 3 and 11.\n\nInstead of searching directly for divisors, Shor’s algorithm converts factorization into a period-finding problem. For a chosen value x, it looks for the smallest period r such that xʳ mod N returns to 1. The quantum portion of the algorithm is used to estimate that period efficiently.",
            },

            {
              type: "link",
              prefix: "Reference:",
              label:
                "Shor’s Algorithm on Wikipedia",
              href:
                "https://en.wikipedia.org/wiki/Shor%27s_algorithm",
            },

            {
              type: "code",
              code: `How the pieces fit together

Simulator S
Runs the quantum circuit
        ↓
Composite gates + pre-compiler
Build larger quantum operations
        ↓
Quantum Fourier Transform
Enables phase extraction
        ↓
Quantum Phase Estimation
Extracts information about a hidden period
        ↓
Modular multiplication
Creates the repeating operation used by Shor
        ↓
Period r
Recovered from the measured phase
        ↓
Classical GCD calculations
Convert the period into factors`,
            },

            {
              type: "text",
              content:
                "To create the periodic operation needed by Shor’s algorithm, I implemented modular multiplication. For a chosen x and number N, a basis state representing y is transformed into xy mod N.",
            },

            {
              type: "equation",
              equation: String.raw`
                U_{x,N}|y\rangle
                =
                |xy \bmod N\rangle
              `,
              caption:
                "Modular multiplication provides the repeating quantum operation used for period finding.",
            },

            {
              type: "text",
              content:
                "Repeatedly applying modular multiplication produces a cycle. The length of that cycle is the period r. Shor’s algorithm does not measure r directly. Instead, quantum phase estimation measures a phase related to the period, and continued fractions are used classically to convert that phase into a candidate value of r.",
            },

            {
              type: "equation",
              equation: String.raw`
                x^r
                \equiv
                1
                \pmod N
              `,
              caption:
                "The period r is the smallest positive exponent that returns the modular sequence to 1.",
            },

            {
              type: "code",
              code: `Shor workflow

1. Choose N to factor

2. Choose x that is coprime with N

3. Build modular multiplication Ux,N

4. Run quantum phase estimation
      ↓
   Controlled powers of Ux,N
      ↓
   Inverse QFT
      ↓
   Measure phase

5. Convert phase to candidate period r

6. Verify
   xʳ mod N = 1

7. Require r to be even

8. Compute

   gcd(x^(r/2) - 1, N)
   gcd(x^(r/2) + 1, N)

9. Return the factors`,
            },

            {
              type: "text",
              content:
                "Once a valid even period is found, the final factorization step is classical. Greatest-common-divisor calculations convert the period into candidate factors of N.",
            },

            {
              type: "equation",
              equation: String.raw`
                p =
                \gcd
                \left(
                  x^{r/2}-1,
                  N
                \right),
                \qquad
                q =
                \gcd
                \left(
                  x^{r/2}+1,
                  N
                \right)
              `,
              caption:
                "The period found by the quantum circuit is converted into candidate factors using classical number theory.",
            },

            {
              type: "text",
              content:
                "The complete implementation ties together the earlier parts of the project. Simulator S executes the circuit, the pre-compiler expands higher-level gates, modular multiplication creates the periodic operation, phase estimation extracts phase information, the inverse QFT makes that information measurable, and classical post-processing converts the result into factors.",
            },
          ],
        },

        {
          title:
            "Results & Optimization",
          blocks: [
            {
              type: "text",
              content:
                "The completed quantum-simulation workflow successfully factored N = 33. Using x = 5, the simulated phase-estimation circuit recovered a period of r = 10 and returned the factors 11 and 3.",
            },

            {
              type: "code",
              code: `Example result

N = 33
x = 5
r = 10

5^(10/2) = 5⁵

gcd(5⁵ - 1, 33) = 11
gcd(5⁵ + 1, 33) = 3

33 = 11 × 3`,
            },

            {
              type: "text",
              content:
                "I also optimized how controlled powers of modular multiplication were generated. A direct implementation would repeat the same controlled modular gate 2ᵏ times. Instead, I calculated x^(2ᵏ) mod N classically and inserted one controlled modular-multiplication operation for each required power.\n\nThis produces the same modular power needed by phase estimation while making the generated Shor circuit much smaller and faster to construct.",
            },
          ],
        },

        {
          title: "What I Learned",
          blocks: [
            {
              type: "text",
              content:
                "Building three implementations of the same simulator made the tradeoff between mathematical simplicity and computational efficiency much more concrete. M-A closely mirrors the textbook matrix formulation, M-B improves on it by avoiding unnecessary matrix-to-matrix multiplication, and S trades some implementation simplicity for much better flexibility and scalability.",
            },

            {
              type: "text",
              content:
                "The larger project also made Shor’s algorithm much easier to understand. Rather than seeing it as one complicated quantum algorithm, I could see how it was assembled from smaller pieces I had already implemented: state simulation, controlled gates, the Quantum Fourier Transform, phase estimation, modular arithmetic, continued fractions, and classical factor recovery.",
            },
          ],
        },
      ]}
    />
  );
}